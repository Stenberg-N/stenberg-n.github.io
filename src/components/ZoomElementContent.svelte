<script lang="ts">
  import { dragElement } from "$lib/actions";
  import { t } from "$lib/i18n/i18n";
  import { imageNotes } from "$lib/projects";

  let {
    options,
  }: {
    options: {
      zoomedElement: HTMLElement | null;
      zoomedElementImage: string;
      setZoomedElementImage: (state: null) => void;
    }
  } = $props();
</script>

<!--
@component
NOTE! This component needs you to wrap it with an element with a class `zoomed-element-container` and also for you to set the custom CSS variables to the said class at the place of use:

@example
.zoomed-element-container {
  top: var(--home-zoomed-element-container-top, 148px);
  left: var(--home-zoomed-element-container-left, 16px);
}
-->

<div class="img-wrapper">
  <div class="flex horizontal">
    <button aria-label="Drag handle for image" class="button-primary transparent"
      use:dragElement={{
        parentElement: options.zoomedElement,
        onMove: (top, left) => {
          options.zoomedElement?.style.setProperty('--home-zoomed-element-container-top', `${top}px`);
          options.zoomedElement?.style.setProperty('--home-zoomed-element-container-left', `${left}px`);
        }
      }}
    >
      <span class="span-icon img-small-medium" style="mask-image: url('/assets/burger.svg');"></span>
    </button>
    <button aria-label="Close image" class="button-primary transparent-highlight default-corners outline" onclick={(e) => { e.stopPropagation(); options.setZoomedElementImage(null); }}>
      <span class="span-icon img-small" style="mask-image: url('/assets/close-x.svg');"></span>
      {$t["button.close"]}
    </button>
  </div>
  <div class="divider"></div>
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
    }
  }

  @media (max-width: 750px) {
    .img-wrapper {
      padding: 0.5rem;
      border-radius: 24px;

      > div {

        button {

          span {
            width: 14px;
            height: 14px
          }
        }
      }

      img {
        max-width: calc(90dvw - 1rem);
        max-height: calc(88dvh - 3rem - 32px - 60px);
      }
    }
  }
</style>