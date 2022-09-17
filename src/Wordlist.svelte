<script lang="ts">
  import type { Word } from "./utils";
  export let wordlist: Word[];
  export let allWords: Word[];

  export let open: boolean = false;
  function findInWordlist(term: string): number {
    return wordlist.findIndex((word) => term === word.term);

  }
  function inWordlist(word: Word): boolean {
    return findInWordlist(word.term) > -1;
  }

  function toggle(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    wordlist.splice(findInWordlist(element.name), 1);

  }
</script>

<div class="popup bg-white card">
  <button
    type="button"
    class="btn-close p-3"
    aria-label="Close"
    on:click={() => (open = false)}
  />

  <h2>Wordlist</h2>
  <ul class="list-group">
    {#each allWords as word}
      <li class="list-group-item">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name={word.term}
            id={`${word.term}-selected`}
            checked={inWordlist(word) ? true : false}
            on:change={toggle}
          />
          <label class="form-check-label" for={`${word.term}-selected`}>
            {word.term} = {word.definition}
          </label>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .popup {
    position: fixed;
    inset: 2em;
    margin: auto;
    z-index: 100;
    max-height: 100%;
    overflow-y: auto;
  }
</style>
