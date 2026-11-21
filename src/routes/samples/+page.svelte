<script lang="ts">
  import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

  import { samples } from "$lib/samples";
  import { t } from "$lib/i18n/i18n";

  type SampleRoute = "c_sharp";
</script>

<div class="flex vertical">
  <div id="code-samples-list" class="marginalized">
    {#each samples as sample, i (i)}
      <button
        class="code-sample-row button-primary notched lighter"
        onclick={() => goto(resolve(`/samples/${sample.slug as SampleRoute}`))}
      >
        {$t[`samples.${sample.slug}`]}
      </button>
    {/each}
  </div>
</div>

<style>
  #code-samples-list {
    width: 100%;
    padding: 2rem 0;

    .code-sample-row {
      justify-content: flex-start;
      width: 100%;
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
</style>