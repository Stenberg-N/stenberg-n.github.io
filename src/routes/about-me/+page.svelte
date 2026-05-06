<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<div id="about-me-container" class="vertical-flex-box">
  {#each $t["about-me.hobbies.titles"] as title, i (i)}
    <h2>{title}</h2>
    <p>{$t["about-me.hobbies.paragraphs"][i]}</p>
  {/each}
</div>

<style>
  #about-me-container {
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }

  #about-me-container h2:first-of-type {
    margin-top: 0;
  }
</style>