<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { fade, fly } from 'svelte/transition';
  import { cubicInOut } from "svelte/easing";

  import { t } from "$lib/i18n";
	import { sendAlert } from "$lib/alert";
  import { type Project } from "$lib/types";
	import { handleClickOutside } from "$lib/actions";

  let {
    project,
    isSecondIntroPic,
  }: {
    project: Project;
    isSecondIntroPic: boolean;
  } = $props();

  const projectImages = $derived(project.allPictures);
  const windowWidth = $derived.by(() => { return getWindowWidth(); });

  let zoomedImage = $state<string | null>(null);
  let zoomedImageId = $state<number | null>(null);
  let zoomedContainer = $state<HTMLDivElement | null>(null);
  const zoomedImageNote = $derived.by(() => { return zoomedImageId !== null ? project.imageNotes.find(note => note.id === zoomedImageId) : null; });

  // FINANCE TRACKER
  const financeTrackerProject = $derived<Project | null>(project.id === 3 ? project : null);
  const financeTrackerDesktopPics = $derived(financeTrackerProject
    ? financeTrackerProject.allPictures.slice(0, 3).concat(financeTrackerProject.allPictures.slice(-2))
    : []
  );
  const financeTrackerWebPics = $derived(financeTrackerProject
    ? financeTrackerProject.allPictures.slice(3, 10)
    : []
  );

  // FINRADAR
  const finRadarProject = $derived<Project | null>(project.id === 1 ? project : null);
  const finRadarSectionPics = $derived(finRadarProject ? [
    { pics: [finRadarProject.allPictures[3], finRadarProject.allPictures[8]] },
    { pics: [finRadarProject.allPictures[2], finRadarProject.allPictures[6]] },
    { pics: [finRadarProject.allPictures[1], finRadarProject.allPictures[4], finRadarProject.allPictures[5]] },
    { pics: [finRadarProject.allPictures[0], finRadarProject.allPictures[9]] },
    { pics: [finRadarProject.allPictures[7], finRadarProject.allPictures[10]] },
  ] : []);

  /**********************************************************************************************************************\
  |
  | Context, Helper & Wrapper functions
  |
  \**********************************************************************************************************************/
  const getWindowWidth = getContext<() => number>('windowWidth');

  /**********************************************************************************************************************/

  const zoomImage = (image: string, id: number) => {
    zoomedImage = image;
    zoomedImageId = id;
  };

</script>

{#if zoomedImage}
  <div role="dialog" tabindex="0" id="zoomedImageOverlay" transition:fade={{ duration: 300, easing: cubicInOut }} onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedImage = null; }}} bind:this={zoomedContainer}>
    <div id="zoomedContainer">
      <button class="zoomedImg-close horizontal-flex-box outline-highlight" onclick={() => zoomedImage = null} transition:fly={{ y: -40, duration: 400, delay: 100, easing: cubicInOut }}><img src="/assets/close-x.svg" alt="close"></button>
      <div class="image-wrapper">
        <img src={zoomedImage} alt="zoomed content" in:fly={{ y: 40, duration: 400, delay: 100, easing: cubicInOut }} use:handleClickOutside={{ requirements: [zoomedImage], onOutsideClick: () => { zoomedImage = null; zoomedImageId = null; } }}>
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
      {#if project === financeTrackerProject}
        <button class="button-transparent outline-highlight interactive-el underline-el demo-link" style="max-height: 50px;"
          onclick={() => sendAlert({ message: "alert.message.demo", isTimer: false, showButtons: true, link: financeTrackerProject.demolink })}
        >
          {$t["project.finance-tracker.demo"]}
        </button>
      {/if}
      <div style="display: flex; flex-direction: row; gap: 10px;">
        <img src="/assets/github-logo.svg" alt="github" class="img-medium" style="filter: brightness(0) invert(0.9);">
        <button class="button-transparent underline-el" onclick={() => sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: project.repo })}>
          {$t["projects.project.repository"]}
        </button>
      </div>
    </div>
  </div>
  <div id="project-intro-content">
    <div id="project-intro-text">
      {#each $t[project.paragraphKey] as text (text)}
        <p>{text}</p>
      {/each}
      <div id="project-features" class="vertical-flex-box">
        {#each $t[project.featuresKey] as feature, i (i)}
          <span>{feature}</span>
        {/each}
      </div>
    </div>
    <div id="project-info">
      <div id="project-intro-images">
        <button class="outline-highlight horizontal-flex-box" onclick={() => zoomImage(projectImages[0].pic, projectImages[0].id)}><img style="width: {project.id === 3 ? '80%' : '100%'}; height: auto;" src={projectImages[0].pic} alt="project"></button>
        {#if isSecondIntroPic}
          <button class="outline-highlight" onclick={() => zoomImage(projectImages[1].pic, projectImages[1].id)}><img style="width: {project.id === 3 ? '80%' : '100%'}; height: auto;" src={projectImages[1].pic} alt="project"></button>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="border-divider"></div>

<div id="project-sub-content">
  <h2>{$t['projects.project.imagetitle']}</h2>
  {#if project === financeTrackerProject}
    {#each Array.from({ length: 2 }, (_, i) => i) as i (i)}
      <div class="app-variant vertical-flex-box">
        <h2>{i === 0 ? $t["projects.project.finance-tracker.variant"][0] : $t["projects.project.finance-tracker.variant"][1]}</h2>
        <div id="project-images">
          {#each (i === 0 ? financeTrackerDesktopPics : financeTrackerWebPics) as { pic, id } (id)}
            <button class="outline-highlight" onclick={() => zoomImage(pic, id)}>
              <img style="width: 100%; height: auto;" src={pic} alt="project">
            </button>
          {/each}
        </div>
      </div>
      {#if i === 0}
        <div class="border-divider" style="margin: 100px 0;"></div>
      {/if}
    {/each}
  {:else if project === finRadarProject}
    {#each finRadarSectionPics as section, i (i)}
      <div class="finradar-section horizontal-flex-box" style="flex-direction: {windowWidth <= 820 ? 'column' : i % 2 ? 'row-reverse' : 'row'};">
        <div class="finradar-section-description vertical-flex-box">
          <h1 style="align-self: {i % 2 ? 'flex-end' : 'flex-start'};">{$t["projects.project.fin-radar.section.titles"][i]}</h1>
          {#each $t["projects.project.fin-radar.section.contents"][i] as content, i (i)}
            <p>{content}</p>
          {/each}
        </div>
        <div class="finradar-section-images vertical-flex-box" style="align-items: {windowWidth <= 820 ? 'center' : i % 2 ? 'flex-start' : 'flex-end'};">
          {#each section.pics as image, idx (image.id)}
          <button class="outline-highlight image-wrapper" onclick={() => zoomImage(image.pic, image.id)}>
            <img src={image.pic} alt="FinRadar image {i + idx}" />
          </button>
          {/each}
        </div>
      </div>
      {#if i !== finRadarSectionPics.length - 1}
        <div class="border-divider" style="margin: 100px 0;"></div>
      {/if}
    {/each}
  {:else}
  <div id="project-images">
    {#each projectImages as { pic, id } (id)}
      <button class="outline-highlight" onclick={() => zoomImage(pic, id)}>
        <img style="width: 100%; height: auto;" src={pic} alt="project">
      </button>
    {/each}
  </div>
  {/if}
</div>

<style>
  #project-intro {
    padding: 1rem;
    user-select: none;
  }

  #project-title-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    margin-bottom: 50px;
  }

  #project-intro-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 40px;
    justify-content: space-between;
  }

  #project-intro-text {
    display: flex;
    flex-direction: column;
    width: 50%;
    font-size: clamp(1rem, 1.08cqw, 1.125rem);
    gap: 1rem;

    p {
      line-height: 1.5rem;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }
  }

  #project-features {
    align-items: flex-start;
    gap: 1rem;
    padding-left: 1rem;

    span {
      position: relative;
      padding-left: 1rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
      }
    }
  }

  #project-info {
    display: flex;
    flex-direction: column;
    width: 50%;

    #project-intro-images {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      width: 100%;

      button {
        border: none;
        padding: 0;
        background-color: transparent;

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }

  #project-sub-content {
    display: flex;
    flex-direction: column;
    user-select: none;

    h2 {
      margin: 0;
      font-weight: 300;
      margin-bottom: 100px;
      align-self: center;
    }
  }

  #project-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 20px), 1fr));
    grid-template-rows: 2, minmax(250px, 1fr);
    justify-content: center;
    gap: 20px;

    button {
      max-width: 100%;
      border: none;
      padding: 2px;
      background-color: transparent;
    }
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

    &:hover {
      background-color: #333;
    }
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

  /*
  FINRADAR PROJECT
  */

  .finradar-section {
    align-items: flex-start;
    height: fit-content;
    padding: 2rem;
    gap: 3rem;
  }

  .finradar-section .finradar-section-description {
    width: 100%;
    text-align: left;
    font-size: clamp(1rem, 1.08cqw, 1.125rem);
    gap: 4rem;

    h1 {
      width: 100%;
      margin-bottom: 4rem;
      font-weight: normal;
      text-align: center;
      line-height: clamp(1.5rem, 2cqw, 2.25rem);
      font-size: clamp(1.5rem, 2cqw, 2.25rem);
    }

    p {
      text-align: center;
      font-size: clamp(1rem, 1.08cqw, 1.125rem);
    }
  }

  .finradar-section .finradar-section-images {
    height: 100%;
    gap: 2rem;
    width: 100%;

    .image-wrapper {
      border: none;
      width: fit-content;
      padding: 0;
    }
  }

</style>