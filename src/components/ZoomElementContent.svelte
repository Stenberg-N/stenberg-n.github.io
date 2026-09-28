<script lang="ts">
  import { imageNotes } from "$lib/projects";

  let {
    options,
  }: {
    options: {
      zoomedElementImage: string;
    }
  } = $props();
</script>

<div class="img-wrapper">
  <img src={options.zoomedElementImage} alt={options.zoomedElementImage.split("/")[2]} />
  {#if imageNotes.has(options.zoomedElementImage)}
    <div class="divider"></div>
    <div id="image-note-container">
      <p>{imageNotes.get(options.zoomedElementImage)}</p>
    </div>
  {/if}
</div>

<style>
  #image-note-container {
    flex-shrink: 0;
    height: 60px;
    overflow-y: auto;

    p {
      margin: 0;
      padding: 0 1rem;
    }
  }

  @media (max-width: 750px) {
    .img-wrapper {
      padding: 0.5rem;
      border-radius: 24px;

      img {
        max-width: calc(90dvw - 1rem);
        max-height: calc(88dvh - 3rem - 36px - 60px);
      }
    }
  }
</style>