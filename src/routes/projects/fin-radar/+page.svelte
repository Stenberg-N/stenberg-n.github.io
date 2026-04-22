<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { t } from "$lib/i18n";
  import { projects } from "$lib/projects";
	import { sendAlert } from "$lib/alert";

  const project = projects.find(p => p.id === 4); if (!project) throw new Error('Project not found');
  const projectImages = project.allPictures;
  let zoomedImage = $state<string | null>(null);
  let zoomedContainer = $state<HTMLDivElement | null>(null);

  const zoomImg = (image: string) => {
    zoomedImage = image;
  };

  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
      if (zoomedImage && node && !node.contains(event.target as Node)) {
        zoomedImage = null;
      }
    };
    document.addEventListener('click', handleClick, true);
    return { destroy() { document.removeEventListener('click', handleClick, true); }};
  };

</script>

{#if zoomedImage}
  <div role="dialog" tabindex="0" id="zoomedImageOverlay" transition:fly={{ y: 100, duration: 200, delay: 100 }} onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedImage = null; }}} bind:this={zoomedContainer}>
    <div id="zoomedContainer">
      <button class="zoomedImg-close hover-highlight" onclick={() => zoomedImage = null}><img src="/assets/close-x.svg" alt="close"></button>
      <div class="image-wrapper">
        <img src={zoomedImage} alt="zoomed content" use:clickOutside>
      </div>
    </div>
  </div>

  {#each [zoomedContainer], i (i)}
    {onMount(() => zoomedContainer?.focus() )}
  {/each}
{/if}

<div id="project-intro">
  <div id="project-title-links">
    <h1>FinRadar</h1>
    <div style="display: flex; flex-direction: row; gap: 10px;">
      <img style="filter: brightness(0) invert(0.9); width: 25px; height: 25px;" src="/assets/github-logo.svg" alt="github">
      <button class="button-default underline-el" onclick={() => sendAlert("alert.message.github", false, true, "https://github.com/Stenberg-N/fin-radar")}>{$t["projects.project.repository"]}</button>
    </div>
  </div>
  <div id="project-intro-content">
    <div id="project-intro-text">
      {#each $t['projects.project.fin-radar.paragraph'] as text (text)}
        <p>{text}</p>
      {/each}
    </div>
    <div id="project-info">
      <div id="project-intro-images" style="object-fit: contain;">
        <button class="hover-highlight" onclick={() => zoomImg("/images/fin-radar1.png")}><img style="width: 80%; height: auto;" src="/images/fin-radar1.png" alt="fin-radar1"></button>
        <button class="hover-highlight" onclick={() => zoomImg("/images/fin-radar2.png")}><img style="width: 80%; height: auto;" src="/images/fin-radar2.png" alt="fin-radar2"></button>
      </div>
    </div>
  </div>
</div>

<div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>

<div id="project-sub-content">
  <h2>{$t['projects.project.imagetitle']}</h2>
  <div id="project-images">
    {#each projectImages as { pic, id } (id)}
      <button class="hover-highlight" onclick={() => zoomImg(pic)}>
        <img style="width: 100%; height: auto;" src={pic} alt="project">
      </button>
    {/each}
  </div>
</div>

<style>
  @media (max-width: 1000px) {
    #project-intro-content {
      flex-direction: column;
    }

    #project-intro-text, #project-info {
      width: 100%;
    }
  }

  @media (max-width: 820px) {
    #project-title-links {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    #project-images {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 500px) {
    #project-title-links {
      align-items: center;
    }
  }
</style>