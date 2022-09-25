<script lang="ts">
  import { getData, type Data } from "./data";

  import Game from "./Game.svelte";
  import type { Word } from "./utils";
  import Wordlist from "./Wordlist.svelte";
  let editWordlist: boolean = false;
  let wordlist: Word[] = JSON.parse(localStorage.getItem("wordlist") ?? "[]");
  let data: Data;
  (async () => {
    data = Object.freeze(await getData("french-module-1-vocab-2.txt"));
  })();

  $: localStorage.setItem("wordlist", JSON.stringify(wordlist));
</script>

<h1>Quizlet Write</h1>

<button class="btn btn-primary" on:click={() => (editWordlist = true)}
  >Edit Wordlist</button
>

{#if editWordlist}
  <Wordlist {wordlist} allWords={data?.data ?? []} bind:open={editWordlist} />
{/if}
<Game {data} bind:wordlist />
