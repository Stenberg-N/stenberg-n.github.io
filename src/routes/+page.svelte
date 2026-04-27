<script lang="ts">
	import { onMount } from "svelte";
  import { t } from '$lib/i18n';
  import { home } from '$lib/home';
  import { fade, fly } from "svelte/transition";
  import { projects } from '$lib/projects';
	import { resolve } from '$app/paths';
	import { sendAlert } from "$lib/alert";
	import { cubicInOut } from "svelte/easing";

  let currentProject = projects.find(p => p.isCurrent) || null;
  const { chosenImages = [], imageNotes = [] } = currentProject || {};
  let zoomedBadge = $state<string | null>(null);
  let zoomedImage = $state<string | null>(null);
  let zoomedImageId = $state<number | null>(null);
  let zoomedImageNote = $derived.by(() => { return zoomedImageId !== null ? imageNotes.find(note => note.id === zoomedImageId) : null; });
  let twitchRight = $state<boolean>(false);
  let zoomedContainer = $state<HTMLDivElement | null>(null);

  const zoombadge = (badge: string) => {
    zoomedBadge = badge;
  };

  const zoomImg = (image: string, id: number) => {
    zoomedImage = image;
    zoomedImageId = id;
  };

  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
      if (zoomedBadge || zoomedImage && node && !node.contains(event.target as Node)) {
        zoomedBadge = null;
        zoomedImage = null;
        zoomedImageId = null;
      }
    };
    document.addEventListener('click', handleClick, true);
    return { destroy() { document.removeEventListener('click', handleClick, true); }};
  };

  const scrollHorizontal = (node: HTMLElement) => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      node.scrollLeft += event.deltaY;
    };

    node.addEventListener('wheel', handleScroll, { passive: false });

    return {
      destroy: () => node.removeEventListener('wheel', handleScroll),
    };
  };

</script>

{#if zoomedBadge || zoomedImage}
  <div role="dialog" tabindex="0" id="zoomedImageOverlay" bind:this={zoomedContainer} transition:fade={{ duration: 300, easing: cubicInOut }} onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedImage = null; zoomedBadge = null; }}}>
    <div id="zoomedContainer">
      <button class="zoomedImg-close hover-highlight" transition:fly={{ y: -100, duration: 300, delay: 100, easing: cubicInOut }}
        onclick={() => { if (zoomedImage) {zoomedImage = null; zoomedImageId = null; } if (zoomedBadge) { zoomedBadge = null } }}
      >
        <img src="/assets/close-x.svg" alt="close">
      </button>
      <div class="image-wrapper" transition:fly={{ y: 100, duration: 300, delay: 100, easing: cubicInOut }}>
        {#if zoomedBadge}
          <img id="zoomedBadge-image" src={zoomedBadge} alt="badge" use:clickOutside>
        {:else if zoomedImage}
          <img id="zoomedImg-image" src={zoomedImage} alt="Current project" use:clickOutside>
        {/if}
      </div>
      {#if zoomedImageNote}
        <span>{$t[zoomedImageNote.note]}</span>
      {/if}
    </div>
  </div>

  {#each [zoomedContainer], i (i)}
    {onMount(() => zoomedContainer?.focus() )}
  {/each}
{/if}

<div id="home-intro-contact" class="horizontal-flex-box">
  <div id="home-intro">
    <div>
      <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #0f0f0f; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title1']}</h1>
      <h1 style="margin: 0; font-size: 48px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title2']}</h1>
      <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #0f0f0f; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title3']}</h1>
      <p style="padding-left: 2rem; margin-top: 20px;">{$t['intro-paragraph']}</p>
    </div>
    <div id="contact" class="vertical-flex-box">
      <div id="github" class="horizontal-flex-box">
        <img src="/assets/github-logo.svg" alt="Github logo" class="img-medium">
        <button class="button-default-bold underline-el" onclick={() => sendAlert("alert.message.github", false, true, "https://github.com/Stenberg-N")}>Stenberg-N</button>
      </div>

      <div id="email" class="horizontal-flex-box" style="user-select: text; word-break: break-all;">
        <img src="/assets/email-logo.svg" alt="Email logo" style="user-select: none;" class="img-medium">
        <span>stenbergniko@outlook.com</span>
      </div>

      <div id="location" class="horizontal-flex-box">
        <img src="/assets/location-pin.svg" alt="Location logo" class="img-medium">
        <span>{$t['contact-location']}</span>
      </div>
    </div>
    <a id="view-projects" class="anchor hover-highlight" href={resolve("/projects")} onmouseenter={() => twitchRight = true} onmouseleave={() => twitchRight = false}>
      <span>{$t["home.view-projects"]}</span>
      <img class:twitch={twitchRight} src="/assets/arrow.svg" alt="arrow" class="img-small">
    </a>
  </div>
  <div id="selfie-image">

  </div>
</div>

<div class="border-divider"></div>

<div id="home-sub-content" class="vertical-flex-box">
  <h2>{$t['home.sub-content.knowledge.title']}</h2>
  <div id="categories-outer">
    <div id="categories" class="horizontal-flex-box" use:scrollHorizontal>
      {#each home as { id, titleKey, descriptionKey, badges } (id)}
        <div class="category vertical-flex-box hover-highlight">
          <h3 style="margin: 0; margin-bottom: 40px;">{$t[titleKey]}</h3>
          <div class="content">
            {#each $t[descriptionKey] as item (item)}
              <span>{item}</span>
            {/each}
            {#if id === 3}
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <button class="button-default-bold underline-el" style="width: fit-content;" onclick={() => sendAlert("alert.message.nixu", false, true, "https://thenixuchallenge.com/c/")}>NIXU</button>
                <button class="button-default-bold underline-el" style="width: fit-content;" onclick={() => sendAlert("alert.message.jamk", false, true, "https://cs4e.pages.labranet.jamk.fi/ooc/20-Background/")}>{$t["home.cybersec.description"].slice(-1)}</button>
              </div>
            {/if}
          </div>
          <div style="display: flex; flex: 1 1 0;"></div>
          {#if badges.length >= 1}
            <div style="overflow: hidden;">
              <div id="badges" class="horizontal-flex-box" use:scrollHorizontal>
                {#each badges as badge (badge)}
                  <button class="vertical-flex-box hover-highlight interactive-el" onclick={() => zoombadge(badge)}><img class="badge" src={badge} alt="badge"></button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="border-divider"></div>

  <h2>{$t['home.sub-content.working-on.title']}</h2>
  <div id="current-project" style="display: flex; flex-direction: column;">
    {#if currentProject}
      <h2 style="margin-bottom: 10px; text-align: center;">{currentProject.title}</h2>
      <span style="align-self: center; text-align: center;">{$t[currentProject.descriptionKey]}</span>
      <div id="current-project-images" class="vertical-flex-box">
        {#each chosenImages as { image, id }, i (image)}
          {#if $t[currentProject.imageTexts]}
            <span style="text-align: center;">{$t[currentProject.imageTexts][i]}</span>
          {/if}
          <button class="current-project-image hover-highlight" onclick={() => zoomImg(image, id)}>
            <img style="object-fit: contain; height: 100%; width: 100%;" src={image} alt="current project">
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  #home-intro-contact {
    flex: 1 1 0;
    gap: 50px;
    padding: 1rem;
    word-wrap: break-word;
    user-select: none;
  }

  #contact {
    gap: 12px;
    margin-top: 40px;
  }

  #contact div {
    justify-content: flex-start;
    width: 100%;
    gap: 20px;
  }

  #view-projects {
    justify-content: space-between;
    max-width: 170px;
    height: 50px;
    margin-top: 60px;
    background-color: #0f0f0f; 
    border-radius: 16px;
    padding: 8px 12px;
  }

  #view-projects img {
    filter: brightness(0) invert(0.9);
    transform: rotateZ(-90deg);
  }

  .twitch {
    animation: twitch-left 0.5s;
  }

  #view-projects:hover {
    background-color: rgba(255, 70, 70, 1);
  }

  #view-projects::after {
    width: 0;
  }

  #github img, #email img, #location img {
    filter: brightness(0) invert(0.9);
  }

  #home-intro, #selfie-image {
    max-width: 60%;
    width: 100%;
    height: 100%;
  }

  #selfie-image {
    max-width: 40%;
    padding: 10px;
    border: 1px solid yellow; 
  }

  #home-sub-content {
    align-items: unset;
    gap: 100px;
    user-select: none;
  }

  #home-sub-content h2 {
    font-weight: 300;
    align-self: center;
    margin: 0;
  }

  #categories {
    justify-content: unset;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    height: 580px;
    padding: 6px 10px 30px;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0) 5%, rgb(0, 0, 0) 95%, rgba(0, 0, 0, 0));
  }

  #categories::-webkit-scrollbar-track {
    margin: 0 40px;
  }

  #categories-outer {
    overflow: hidden;
    padding: 0 50px;
  }

  .category {
    align-items: unset;
    min-width: calc(50% - 40px);
    max-width: 650px;
    width: 100%;
    height: 100%;
    padding: 1rem;
    margin: 0 20px;
    border-radius: 12px;
    background-color: rgba(15, 15, 15, 0.8);
  }

  #categories .category .content {
    padding-left: 1rem;
  }

  #categories .category .content span {
    position: relative;
    display: block;
    padding-left: 1em;
    font-size: 18px;
    margin-bottom: 20px;
  }

  #categories .category .content span::before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: 18px;
  }

  #badges {
    justify-content: flex-start;
    max-height: 180px;
    gap: 10px;
    padding: 30px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  #badges::-webkit-scrollbar-track {
    margin-top: 0;
  }

  #badges button {
    height: 120px;
    width: 120px;
    border-radius: 16px;
    padding: 0;
    margin: 0;
    transition: transform 0.2s;
  }

  .badge {
    height: 120px;
    width: 120px;
    border-radius: 16px;
  }

  #current-project-images {
    justify-content: unset;
    margin-top: 80px;
    padding: 0 80px;
  }

  .current-project-image {
    padding: 2rem;
    background-color: #0f0f0f;
    height: 550px;
    width: 100%;
    margin-top: 20px;
    border: 0;
    border-radius: 12px;
  }

  .current-project-image:not(:last-child) {
    margin-bottom: 80px;
  }

  .current-project-image:hover {
    cursor: pointer;
    transform: translateY(-4px);
  }

  @media (max-width: 1200px) {

    #home-intro-contact {
      flex-direction: column;
    }

    #home-intro, #selfie-image {
      max-width: 100%;
    }

    #home-sub-content {
      gap: 50px;
      padding: 0;
    }

    #categories-outer {
      padding: 0;
    }

    #current-project-images {
      padding: 0 30px;
    }

    .current-project-image {
      height: auto;
      max-height: 550px;
    }
  }

  @media (max-width: 750px) {
    .category {
      min-width: calc(100% - 40px);
    }

    .category h3 {
      font-size: 16px;
    }

    #categories .category .content span {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .current-project-image {
      padding: 5px;
    }
  }

  @keyframes twitch-left {
    0% { transform: translateX(0) rotateZ(-90deg); }
    50% { transform: translateX(6px) rotateZ(-90deg); }
    100% { transform: translateX(0) rotateZ(-90deg); }
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff2) format('woff2');
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
</style>