<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { t } from "$lib/i18n";
  import { projects } from "$lib/projects";
	import { fly } from "svelte/transition";
	import Alert from "../../components/Alert.svelte";

  const project = projects.find(p => p.id === 1); if (!project) throw new Error('Project not found');
  const desktopPics = project.allPictures.slice(0, 3).concat(project.allPictures.slice(-2));
  const webPics = project.allPictures.slice(3, 10);
  const variantIndices = Array.from({ length: 2 }, (_, i) => i);
  let zoomedImage = $state<string | null>(null);
  let link = $state<"https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/" | "https://github.com/Stenberg-N/finance-tracker" | null>(null);
  let isAlert = $state<boolean>(false);
  let alertMessage = $state<string>('');
  let zoomedContainer = $state<HTMLDivElement | null>(null);

  // Context and helper/wrapper functions

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');
  const { propagateAlert, getParentAlert } = getContext<{ propagateAlert: (state: boolean) => void, getParentAlert: () => boolean }>('alertContext');

  const isAlertDisabled = $derived.by(() => getParentAlert());

  const setAlert = (state: boolean) => {
    isAlert = state;
  };

  onMount(() => {
    setOnHomeScreen(false);
  });

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
      {#if zoomedImage === desktopPics[desktopPics.length - 1]['pic']}
        <span style="text-align: center; margin-top: 20px; max-width: 90%; background-color: #000;">{$t[project.imageTexts]}</span>
      {/if}
    </div>
  </div>

  {#each [zoomedContainer], i (i)}
    {onMount(() => zoomedContainer?.focus() )}
  {/each}
{/if}

{#if isAlert}
  <Alert link={link} alertMessage={alertMessage} setAlert={setAlert} isRedirecting={true} height={80} />
{/if}

<div id="project-intro">
  <div id="project-title-links">
    <h1 style="margin: 0;">Finance Tracker</h1>
    <div id="links" style="margin-bottom: 0;">
      <button id="demo-link" class="button-custom hover-highlight interactive-el underline-el" class:disabled={isAlertDisabled} disabled={isAlertDisabled} style="max-height: 50px; color: #f6f6f6; font-weight: 800;"
        onclick={() => { link="https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/"; alertMessage="alert.message.demo"; isAlert = true; propagateAlert(true); }}
      >
        {$t["project.finance-tracker.demo"]}
      </button>
      <div style="display: flex; flex-direction: row; gap: 10px;">
        <img src="/assets/github-logo.svg" alt="Github logo" style="height: 25px; width: 25px; filter: brightness(0) invert(0.9);">
        <button class="button-default underline-el" class:disabled={isAlertDisabled} disabled={isAlertDisabled} onclick={() => { link="https://github.com/Stenberg-N/finance-tracker"; alertMessage="alert.message.github"; isAlert = true; propagateAlert(true); }}>
          {$t["projects.project.repository"]}
        </button>
      </div>
    </div>
    </div>
  <div id="project-intro-content">
    <div id="project-intro-text">
      {#each $t['projects.project.finance-tracker.paragraph'] as text (text)}
        <p>{text}</p>
      {/each}
    </div>
    <div id="project-info">
      <div id="project-intro-images" style="object-fit: contain;">
        <button class="hover-highlight" onclick={() => zoomImg(project.picture)}><img style="width: 100%; height: auto;" src={project.picture} alt="project"></button>
        <button class="hover-highlight" onclick={() => zoomImg("/images/web-finance-tracker1.png")}><img style="width: 100%; height: auto;" src="/images/web-finance-tracker1.png" alt="web project"></button>
      </div>
    </div>
  </div>
</div>

<div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>

<div id="project-sub-content">
  {#each variantIndices as i (i)}
    <div class="app-variant">
      <h2>{i === 0 ? $t["projects.project.finance-tracker.variant"][0] : $t["projects.project.finance-tracker.variant"][1]}</h2>
      <div id="project-images">
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
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .disabled:hover::after {
    width: 0;
  }

  #links {
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

  #project-intro-text {
    width: 50%;
  }

  #project-info {
    width: 50%;
  }

  #project-sub-content {
    gap: 100px;
  }

  #project-sub-content h2 {
    align-self: unset;
  }

  .app-variant {
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem;
    align-items: center;
  }

  @media (max-width: 1200px) {
    #project-intro-content {
      flex-direction: column;
    }

    #project-info, #project-intro-text {
      width: 100%;
    }
  }

  @media (max-width: 820px) {
    #project-title-links, #links {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    #project-images {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 500px) {
    #project-title-links, #links {
      align-items: center;
    }

    #demo-link {
      font-size: 14px;
    }
  }
</style>