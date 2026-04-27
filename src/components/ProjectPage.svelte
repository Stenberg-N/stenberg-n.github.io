<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from 'svelte/transition';
  import { t } from "$lib/i18n";
	import { sendAlert } from "$lib/alert";
	import { projects } from "$lib/projects";
	import { cubicInOut } from "svelte/easing";

  let {
    projectId,
    isSecondIntroPic,
  }: {
    projectId: number | null;
    isSecondIntroPic: boolean;
  } = $props();

  const project = projects.find(p => p.id === projectId); if (!project) throw new Error('Project not found');
  const projectImages = $derived(project.allPictures);

  // FINANCE TRACKER
  const financeTrackerProject = projects.find(p => p.id === 1); if (!financeTrackerProject) throw new Error('Project not found');
  const financeTrackerDesktopPics = financeTrackerProject.allPictures.slice(0, 3).concat(financeTrackerProject.allPictures.slice(-2));
  const financeTrackerWebPics = financeTrackerProject.allPictures.slice(3, 10);

  let zoomedImage = $state<string | null>(null);
  let zoomedImageId = $state<number | null>(null);
  let zoomedContainer = $state<HTMLDivElement | null>(null);
  let zoomedImageNote = $derived.by(() => { return zoomedImageId !== null ? project.imageNotes.find(note => note.id === zoomedImageId) : null; });

  const zoomImg = (image: string, id: number) => {
    zoomedImage = image;
    zoomedImageId = id;
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
  <div role="dialog" tabindex="0" id="zoomedImageOverlay" transition:fade={{ duration: 300, easing: cubicInOut }} onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedImage = null; }}} bind:this={zoomedContainer}>
    <div id="zoomedContainer">
      <button class="zoomedImg-close hover-highlight" onclick={() => zoomedImage = null} transition:fly={{ y: -100, duration: 300, delay: 100, easing: cubicInOut }}><img src="/assets/close-x.svg" alt="close"></button>
      <div class="image-wrapper">
        <img src={zoomedImage} alt="zoomed content" use:clickOutside transition:fly={{ y: 100, duration: 300, delay: 100, easing: cubicInOut }}>
      </div>
      {#if zoomedImageNote}
        <span style="text-align: center; max-width: 90%; background-color: #000;">{$t[zoomedImageNote.note]}</span>
      {/if}
    </div>
  </div>

  {#each [zoomedContainer], i (i)}
    {onMount(() => zoomedContainer?.focus() )}
  {/each}
{/if}

<div id="project-intro">
  <div id="project-title-links">
    <h1>{project.title}</h1>
    <div class="links horizontal-flex-box" style="margin-bottom: 0;">
      {#if project.id === financeTrackerProject.id}
        <button class="button-default-bold hover-highlight interactive-el underline-el demo-link" style="max-height: 50px;"
          onclick={() => sendAlert("alert.message.demo", false, true, financeTrackerProject.demolink)}
        >
          {$t["project.finance-tracker.demo"]}
        </button>
      {/if}
      <div style="display: flex; flex-direction: row; gap: 10px;">
        <img src="/assets/github-logo.svg" alt="github" class="img-medium" style="filter: brightness(0) invert(0.9);">
        <button class="button-default-bold underline-el" onclick={() => sendAlert("alert.message.github", false, true, project.repo)}>{$t["projects.project.repository"]}</button>
      </div>
    </div>
  </div>
  <div id="project-intro-content">
    <div id="project-intro-text">
      {#each $t[project.paragraphKey] as text (text)}
        <p>{text}</p>
      {/each}
    </div>
    <div id="project-info">
      <div id="project-intro-images">
        <button class="hover-highlight" onclick={() => zoomImg(projectImages[0].pic, projectImages[0].id)}><img style="width: {project.id === 3 ? '80%' : '100%'}; height: auto;" src={projectImages[0].pic} alt="project"></button>
        {#if isSecondIntroPic}
          <button class="hover-highlight" onclick={() => zoomImg(projectImages[1].pic, projectImages[1].id)}><img style="width: {project.id === 3 ? '80%' : '100%'}; height: auto;" src={projectImages[1].pic} alt="project"></button>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="border-divider"></div>

<div id="project-sub-content">
  <h2>{$t['projects.project.imagetitle']}</h2>
  {#if project.id === 1}
    {#each Array.from({ length: 2 }, (_, i) => i) as i (i)}
      <div class="app-variant vertical-flex-box">
        <h2>{i === 0 ? $t["projects.project.finance-tracker.variant"][0] : $t["projects.project.finance-tracker.variant"][1]}</h2>
        <div id="project-images">
          {#each (i === 0 ? financeTrackerDesktopPics : financeTrackerWebPics) as { pic, id } (id)}
            <button class="hover-highlight" onclick={() => zoomImg(pic, id)}>
              <img style="width: 100%; height: auto;" src={pic} alt="project">
            </button>
          {/each}
        </div>
      </div>
      {#if i === 0}
        <div class="border-divider" style="margin: 100px 0;"></div>
      {/if}
    {/each}
  {:else}
  <div id="project-images">
    {#each projectImages as { pic, id } (id)}
      <button class="hover-highlight" onclick={() => zoomImg(pic, id)}>
        <img style="width: 100%; height: auto;" src={pic} alt="project">
      </button>
    {/each}
  </div>
  {/if}
</div>

<style>
  #project-intro-text {
    width: 50%;
  }

  #project-info {
    width: 50%;
  }

  .app-variant {
    padding: 0 1rem 1rem;
  }

  .links {
    gap: 50px;
  }

  .demo-link {
    padding: 10px 18px;
    border-radius: 8px;
  }

  @media (max-width: 1200px) {
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