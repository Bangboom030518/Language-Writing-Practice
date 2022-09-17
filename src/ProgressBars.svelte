<script lang="ts">
  import Progress from "./Progress.svelte";
  import type { Word } from "./utils";
  export let wordlist: Word[];
  export let correct: Word[];
  export let incorrect: Word[];
  export let incomplete: Word[];
</script>

{#if wordlist.length > 0}
  <Progress
    value={wordlist.length - incomplete.length}
    total={wordlist.length}
    quantity="completed"
  />
  <Progress value={correct.length} total={wordlist.length} quantity="correct" />
  <Progress value={incorrect.length} total={wordlist.length} quantity="incorrect" />
{/if}
