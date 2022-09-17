<script lang="ts">
  import type { Word } from "./utils";
  export let incorrect: Word[];
  export let onLearnFailed: () => void;
  export let onRestart: () => void;
</script>

<div class="d-grid gap-2">
  <h2>Finished!</h2>
  {#if incorrect.length > 0}
    <h3>Incorrect:</h3>
    <ul class="list-group">
      {#each incorrect as word}
        <li class="list-group-item">{word.term}</li>
      {/each}
    </ul>
  {/if}

  <div class="btn-group">
    {#if incorrect.length > 0}
      <button class="btn btn-secondary w-50" on:click={onLearnFailed}
        >Continue with incorrect</button
      >
    {/if}
    <button class="btn btn-primary w-50" on:click={onRestart}>Restart</button>
  </div>
</div>
