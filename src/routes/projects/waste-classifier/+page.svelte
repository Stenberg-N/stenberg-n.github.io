<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Alert from "../../components/Alert.svelte";
  import { t } from "$lib/i18n";
  import { projects } from "$lib/projects";
  import '../../../styles.project.css';

  const project = projects.find(p => p.id === 3); if (!project) throw new Error('Project not found');
  const projectImages = project.allPictures;
  let zoomedImage = $state<string | null>(null);
  let isAlert = $state<boolean>(false);
  let alertMessage = $state<string>('');
  let link = $state<"https://github.com/Stenberg-N/waste-classification" | null>(null);
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
    <div id="zoomedContainer" use:clickOutside>
      <button class="zoomedImg-close hover-highlight" onclick={() => zoomedImage = null}><img src="/assets/close-x.svg" alt="close"></button>
      <img src={zoomedImage} alt="zoomed content" style="max-width: 90%; max-height: 90%; object-fit: contain;">
      {#if zoomedImage === projectImages[2]['pic']}
        <span style="margin-top: 20px; max-width: 90%;">{$t[project.imageTexts]}</span>
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

<div id="intro">
  <div id="title-links">
    <h1>Waste Classifier</h1>
    <div style="display: flex; flex-direction: row; gap: 10px;">
      <img style="filter: brightness(0) invert(0.9); width: 25px; height: 25px;" src="/assets/github-logo.svg" alt="github">
      <button class="button-default underline-el" class:disabled={isAlertDisabled} disabled={isAlertDisabled} onclick={() => { link="https://github.com/Stenberg-N/waste-classification"; alertMessage="alert.message.github"; isAlert = true; propagateAlert(true); }}>
        Project repository
      </button>
    </div>
  </div>
  <div id="intro-content">
    <div id="intro-text">
      {#each $t['projects.project.waste-classifier.paragraph'] as text (text)}
        <p>{text}</p>
      {/each}
    </div>
    <div id="project-info">
      <div id="project-intro-images" style="object-fit: contain;">
        <button class="hover-highlight" onclick={() => zoomImg("/images/waste-classifier1.png")}><img style="width: 80%; height: auto;" src="/images/waste-classifier1.png" alt="waste-classifier1"></button>
        <button class="hover-highlight" onclick={() => zoomImg("/images/waste-classifier2.png")}><img style="width: 80%; height: auto;" src="/images/waste-classifier2.png" alt="waste-classifier2"></button>
      </div>
    </div>
  </div>
</div>

<div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>

<div id="sub-content">
  <h2>Project Images</h2>
  <div id="project-images">
    {#each projectImages as { pic, id } (id)}
      <button class="hover-highlight" onclick={() => zoomImg(pic)}>
        <img style="width: 100%; height: auto;" src={pic} alt="project">
      </button>
    {/each}
  </div>
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

  @media (max-width: 1000px) {
    #intro-content {
      flex-direction: column;
    }

    #intro-text, #project-info {
      width: 100%;
    }
  }

  @media (max-width: 820px) {
    #title-links {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    #project-images {
      flex-direction: column;
    }

    #project-images button {
      max-width: 100%;
    }
  }

  @media (max-width: 500px) {
    #title-links {
      align-items: center;
    }
  }
</style>