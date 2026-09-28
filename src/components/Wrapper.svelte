<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";

	import { dragElement, handleClickOutside, isElDragged } from "$lib/actions";
  import { viewport } from "$lib/viewport";

  let {
    children,
    options,
  }: {
    children: Snippet<[]>,
    options: {
      setZoomedElementImage: (state: null) => void;
      ignorableEls?: (HTMLElement | null)[];
    }
  } = $props();

  let wrapper = $state<HTMLDivElement | null>(null);
  let closeBtn = $state<HTMLButtonElement | null>(null);
  const vp = $derived(get(viewport));

  onMount(() => {
    if (!wrapper) return;

    const h = vp.width <= 750 ? '148px' : '100px';
    const w = `${(vp.width / 2) - (wrapper.clientWidth / 2)}px`;

    wrapper.style.setProperty('--wrapper-element-top', h);
    wrapper.style.setProperty('--wrapper-element-left', w);
  });

  const applyProperty = (top: number, left: number) => {
    if (!wrapper) return;

    wrapper.style.setProperty('--wrapper-element-top', `${top}px`);
    wrapper.style.setProperty('--wrapper-element-left', `${left}px`);
  };
</script>

<div
  class="wrapper-element-container flex vertical"
  bind:this={wrapper}
  role="dialog"
  tabindex="0"
  onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); options.setZoomedElementImage(null); } }}
  use:handleClickOutside={{ onOutsideClick: () => options.setZoomedElementImage(null), getIgnorableEls: () => options.ignorableEls ?? [] }}
  transition:fade={{ duration: 200, easing: cubicInOut }}
>
  <div id="drag-handle" class="flex horizontal" class:dragged={$isElDragged} use:dragElement={{ parentElement: wrapper, onMove: (top, left) => { applyProperty(top, left); }, ignoreEl: closeBtn }}>
    <div id="filler"></div>
    <span class="span-icon img-small" style="mask-image: url('/assets/burger.svg');"></span>
    <button bind:this={closeBtn} aria-label="Close image" class="button-primary transparent-highlight" onclick={(e) => { e.stopPropagation(); options.setZoomedElementImage(null); }}>
      <span class="span-icon img-small" style="mask-image: url('/assets/close-x.svg');"></span>
    </button>
  </div>
  <div class="divider"></div>
  {@render children()}
</div>

{#each [wrapper], i (i)}
  {onMount(() => wrapper?.focus())}
{/each}

<style>
  .wrapper-element-container {
    top: var(--wrapper-element-top);
    left: var(--wrapper-element-left);

    position: fixed;
    max-width: 90dvw;
    max-height: 88dvh;
    z-index: 10000;
    align-items: center;
    gap: 0;
    border-radius: 2rem;
    background-color: var(--bg-color-secondary2);
    outline: 1px solid var(--border-color-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);

    #filler {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
    }

    #drag-handle {
      width: 100%;
      justify-content: space-between;
      padding: 0.25rem 1.5rem;

      &.dragged {
        cursor: grabbing;
      }
    }
  }
</style>