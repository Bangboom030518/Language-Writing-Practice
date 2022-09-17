<script lang="ts">
  import type { Word } from "./utils";
  export let current: Word;
  export let submission: string;
  export let onContinue: () => void;
  export let onOverride: () => void;
</script>

<h2>Current Term: {current.term}</h2>
<h3>Incorrect Answer?</h3>
<p>Correct answer: {current.definition}</p>
<p>Your answer: {submission}</p>
<div class="btn-group">
  <button on:click={onOverride} class="btn btn-danger"
    >Override - I was correct</button
  >
  <button on:click={onContinue} class="btn btn-primary"
    >Continue - I was incorrect</button
  >
</div>
