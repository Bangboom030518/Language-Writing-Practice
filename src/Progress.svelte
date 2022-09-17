<script lang="ts">
  import { capitalise } from "./utils";

  export let value: number;
  export let quantity: string;
  export let total: number;
  let progress: number;
  let width: string;
  $: progress = value / total;
  $: width = `${progress * 100}%`;
</script>

<div class="container">
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      style:width
    >
      {value}/{total}
      {capitalise(quantity)}
    </div>
  </div>
</div>
