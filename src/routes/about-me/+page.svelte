<script lang="ts">
  import { t } from "$lib/i18n/i18n";
</script>

<div id="about-me-container" class="flex vertical marginalized">
  {#each $t["about-me.hobbies.titles"] as title, i (i)}
    <div>
      <h2>{title}</h2>
      <p>{$t["about-me.hobbies.paragraphs"][i]}</p>
    </div>
  {/each}
</div>

<style>
  #about-me-container {
    align-items: flex-start;
    gap: 2rem;
    padding: 0 2rem;

    > div {
      width: 100%;
      padding: 2rem;
      border-radius: 8px;
      outline: 1px solid var(--border-color-primary);
    }

    h2 {
      margin: 0 0 1rem;
    }

    p {
      margin: 0;
      hyphens: auto;
    }
  }
</style>