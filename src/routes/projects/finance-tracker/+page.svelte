<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { t } from "$lib/i18n";
  import { projects } from "$lib/projects";
	import { fly } from "svelte/transition";

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');
  const project = projects.find(p => p.id === 1); if (!project) throw new Error('Project not found');
  const desktopPics = project.allPictures.slice(0, 3).concat(project.allPictures.slice(-2));
  const webPics = project.allPictures.slice(3, 10);

  const variantIndices = Array.from({ length: 2 }, (_, i) => i);

  let zoomedImage = $state<string | null>(null);

  onMount(() => {
    setOnHomeScreen(false);
  });

  const zoomImg = (image: string) => {
    zoomedImage = image;
  }

  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
      if (zoomedImage && node && !node.contains(event.target as Node)) {
        zoomedImage = null;
      }
    };
    document.addEventListener('click', handleClick, true);
    return { destroy() { document.removeEventListener('click', handleClick, true); }};
  }

</script>

{#if zoomedImage}
  <div id=zoomedImageOverlay style="position: fixed; inset: 0; z-index: 101; display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(4px); user-select: none;" transition:fly={{ y: 100, duration: 200, delay: 100 }}>
    <div use:clickOutside style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
      <button class="zoomedImg-close hover-highlight" onclick={() => zoomedImage = null}><img src="/assets/close-x.svg" alt="close"></button>
      <img src={zoomedImage} alt="zoomed content" style="max-width: 90%; max-height: 90%;">
      {#if zoomedImage === desktopPics[desktopPics.length - 1]['pic']}
        <span style="margin-top: 20px; max-width: 90%;">{$t[project.imageTexts]}</span>
      {/if}
    </div>
  </div>
{/if}

<div id="intro">
  <div id="title-links">
    <h1 style="margin: 0;">Finance Tracker</h1>
    <div id="links" style="margin-bottom: 0;">
      <a id="demo-link" class="anchor interactive-el hover-highlight" style="max-height: 50px;" href="https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/">{$t["project.finance-tracker.demo"]}</a>
      <div style="display: flex; flex-direction: row; gap: 10px;"><img src="/assets/github-logo.svg" alt="Github logo" style="height: 25px; width: 25px; filter: brightness(0) invert(0.9);"><a class="anchor" href="https://github.com/Stenberg-N/finance-tracker">Project repository</a></div>
    </div>
    </div>
  <div id="intro-content">
    <div id="intro-text">
      {#each $t['projects.project.finance-tracker.paragraph'] as text (text)}
        <p>{text}</p>
      {/each}
    </div>
    <div id="project-info">
      <div id="project-images" style="object-fit: contain;">
        <button class="hover-highlight" onclick={() => zoomImg(project.picture)}><img style="width: 100%; height: auto;" src={project.picture} alt="project"></button>
        <button class="hover-highlight" onclick={() => zoomImg("/images/web-finance-tracker1.png")}><img style="width: 100%; height: auto;" src="/images/web-finance-tracker1.png" alt="web project"></button>
      </div>
    </div>
  </div>
</div>

<div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>

<div id="sub-content">
  {#each variantIndices as i (i)}
    <div class="app-variant">
      <h2>{i === 0 ? $t["projects.project.finance-tracker.variant"][0] : $t["projects.project.finance-tracker.variant"][1]}</h2>
      <div class="project-images">
        {#each (i === 0 ? desktopPics : webPics) as { pic, id } (id)}
          <button class="hover-highlight" onclick={() => zoomImg(pic)}>
            <img style="width: 100%; height: auto;" src={pic} alt="project">
          </button>
        {/each}
      </div>
    </div>
    <div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>
  {/each}

</div>

<style>
  #intro {
    padding: 1rem;
    user-select: none;
  }

  #title-links, #links {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
    gap: 50px;
  }

  #demo-link {
    padding: 10px 18px;
    border-radius: 8px;
  }

  #intro-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 40px;
    justify-content: space-between;
  }

  #intro-text {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 1rem;
  }

  #intro-text p {
    line-height: 1.5rem;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }

  #project-info {
    display: flex;
    flex-direction: column;
    max-width: 50%;
  }

  #project-images {
    max-height: 100%;
    max-width: 100%;
  }

  #project-images button {
    border: none;
    background-color: transparent;
    padding: 0;
  }

  #project-images button:not(:last-child) {
    margin-bottom: 20px;
  }

  #sub-content {
    display: flex;
    flex-direction: column;
    gap: 100px;
    user-select: none;
  }

  #sub-content h2 {
    margin: 0;
    font-weight: 300;
    margin-bottom: 100px;
  }

  .app-variant {
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem;
    align-items: center;
  }

  .project-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .project-images button {
    max-width: calc(50% - 20px);
    border: none;
    background-color: transparent;
  }

  @media (max-width: 1200px) {
    #intro-content {
      flex-direction: column;
    }

    #project-info, #intro-text {
      max-width: 100%;
    }
  }

  @media (max-width: 820px) {
    #title-links, #links {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .project-images button {
      max-width: 100%;
    }
  }

  @media (max-width: 500px) {
    #title-links, #links {
      align-items: center;
    }

    #demo-link {
      font-size: 14px;
    }
  }
</style>