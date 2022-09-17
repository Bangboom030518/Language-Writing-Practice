<script lang="ts">
  import { randChoice, normaliseInput, type Word } from "./utils";
  import ProgressBars from "./ProgressBars.svelte";
  import Incorrect from "./Incorrect.svelte";
  import Finished from "./Finished.svelte";
  import type { Data } from "./data";

  enum State {
    waiting,
    playing,
    incorrect,
    finished,
  }

  const correctSound = new Audio("correct.mp3");
  const incorrectSound = new Audio("incorrect.mp3");
  const successSound = new Audio("success.mp3");

  export let data: Data;
  export let wordlist: Word[] = JSON.parse(
    localStorage.getItem("wordlist") ?? "[]"
  );


  let nonAsciiChars = [];
  let incomplete: Word[] = [];
  let correct: Word[] = [];
  let incorrect: Word[] = [];

  $: {
    if (incomplete.length > 0) {
      localStorage.setItem("correct", JSON.stringify(correct));
      localStorage.setItem("incorrect", JSON.stringify(incorrect));
      localStorage.setItem("incomplete", JSON.stringify(incomplete));
    }
  }

  let state: State = State.waiting;

  let current: Word;
  let submission: string = "";

  function submit() {
    if (normaliseInput(submission) === normaliseInput(current.definition)) {
      correctAnswer();
    } else {
      state = State.incorrect;
    }
  }

  async function correctAnswer() {
    correct.push(current);
    correct = correct;
    await correctSound.play();
    pickWord();
  }

  async function incorrectAnswer() {
    incorrect.push(current);
    incorrect = incorrect;
    await incorrectSound.play();
    pickWord();
  }

  async function pickWord() {
    state = State.playing;
    submission = "";
    if (current) {
      const index = incomplete.findIndex(
        (value) => value.term === current.term
      );
      if (index > -1) {
        incomplete.splice(incomplete.indexOf(current), 1);
        incomplete = incomplete;
      }
      if (incomplete.length === 0) {
        state = State.finished;
        successSound.play();
        return;
      }
    }
    current = randChoice(incomplete);
  }

  function clearProgress() {
    localStorage.clear();
    location.reload();
  }

  function restart() {
    incomplete = [...wordlist];
    incorrect = [];
    correct = [];
    pickWord();
  }

  function learnFailed() {
    incomplete = [...incorrect];
    incorrect = [];
    pickWord();
  }

  async function startGame() {
    const cached = localStorage.getItem("incomplete");
    if (cached && cached !== "[]") {
      wordlist = JSON.parse(localStorage.getItem("wordlist"));
      incomplete = JSON.parse(localStorage.getItem("incomplete"));
      correct = JSON.parse(localStorage.getItem("correct"));
      incorrect = JSON.parse(localStorage.getItem("incorrect"));
      nonAsciiChars = JSON.parse(localStorage.getItem("awkward-chars"));
    } else {
      nonAsciiChars = data.nonAsciiChars;
      wordlist = data.data;
      incomplete = [...wordlist];
      correct = [];
      incorrect = [];
    }
    pickWord();
  }
</script>

<main class="w-100">
  {#if state == State.playing}
    <h2>
      Current Word: <span class="badge bg-secondary">{current?.term ?? ""}</span
      >
    </h2>
    <div class="container d-grid gap-2">
      <label for="word-input" class="form-label">Enter your answer</label>
      <input
        type="text"
        name="word-input"
        id="word-input"
        class="form-control"
        placeholder="Guess Here"
        autocomplete="off"
        bind:value={submission}
        on:keypress={(event) => event.key == "Enter" && submit()}
      />
      <div class="container flex-lg-row gap-2">
        <div class="btn-group">
          {#each nonAsciiChars ?? [] as char}
            <button
              on:click={() => {
                submission += char;
                document.getElementById("word-input").focus();
              }}
              class="btn btn-secondary">{char}</button
            >
          {/each}
        </div>
        <button on:click={submit} class="btn btn-primary">Submit</button>
      </div>
      <ProgressBars {wordlist} {correct} {incorrect} {incomplete} />
    </div>
  {:else if state == State.incorrect}
    <Incorrect
      {current}
      {submission}
      onContinue={incorrectAnswer}
      onOverride={correctAnswer}
    />
  {:else if state == State.finished}
    <Finished onLearnFailed={learnFailed} onRestart={restart} {incorrect} />
  {:else}
    <button class="btn btn-primary" on:click={startGame}>Start Game</button>
    <button class="btn btn-danger" on:click={clearProgress}
      >Clear Progress</button
    >
  {/if}
</main>
