<script lang="ts">
	import { getContext, onMount } from "svelte";
  import { t } from '$lib/i18n';
  import { home } from '$lib/home';
  import { fly } from "svelte/transition";
  import { projects } from '$lib/projects';
	import { resolve } from '$app/paths';

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');
  const { setCurrentPage } = getContext<{ setCurrentPage: (page: string) => void }>('currentPage');

  let currentProject = projects.find(p => p.isCurrent) || null;
  const { chosenImages = [], imageNotes = [] } = currentProject || {};
  let zoomedBadge = $state<string | null>(null);
  let zoomedImg = $state<string | null>(null);
  let zoomedImgId = $state<number | null>(null);
  let zoomedImgNote = $derived.by(() => { return zoomedImgId !== null ? imageNotes.find(note => note.id === zoomedImgId) : null; });

  let twitchRight = $state<boolean>(false);

  onMount(() => {
    setOnHomeScreen(true);
    setCurrentPage('/');
  });

  const zoombadge = (badge: string) => {
    zoomedBadge = badge;
  }

  const zoomImg = (image: string, id: number) => {
    zoomedImg = image;
    zoomedImgId = id;
  }

  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
      if (zoomedBadge || zoomedImg && node && !node.contains(event.target as Node)) {
        zoomedBadge = null;
        zoomedImg = null;
        zoomedImgId = null;
      }
    };
    document.addEventListener('click', handleClick, true);
    return { destroy() { document.removeEventListener('click', handleClick, true); }};
  }

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

{#if zoomedBadge || zoomedImg}
  <div id="zoomedOverlay" transition:fly={{ y: 100, duration: 200, delay: 100 }}>
    <div use:clickOutside style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
      {#if zoomedBadge}
        <button class="zoomedImg-close hover-highlight" onclick={() => zoomedBadge = null}><img src="/assets/close-x.svg" alt="close"></button>
        <img id="zoomedBadge-image" src={zoomedBadge} alt="badge">
      {:else if zoomedImg}
        <button class="zoomedImg-close hover-highlight" onclick={() => { zoomedImg = null; zoomedImgId = null; }}><img src="/assets/close-x.svg" alt="close"></button>
        <img id="zoomedImg-image" src={zoomedImg} alt="Current project">
        {#if zoomedImgNote}
          <span>{$t[zoomedImgNote.note]}</span>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<div id="intro-contact">
  <div id="intro">
    <div id="intro-text">
      <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #0f0f0f; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title1']}</h1>
      <h1 style="margin: 0; font-size: 48px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title2']}</h1>
      <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #0f0f0f; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title3']}</h1>
      <p style="padding-left: 2rem; margin-top: 20px;">{$t['intro-paragraph']}</p>
    </div>
    <div id="contact" style="display: flex; flex-direction: column; gap: 12px; margin-top: 40px;">
      <div id="github"><img src="/assets/github-logo.svg" alt="Github logo"><a class="anchor" href="https://github.com/Stenberg-N">Stenberg-N</a></div>
      <div id="email" style="user-select: text; word-break: break-all;"><img src="/assets/email-logo.svg" alt="Email logo" style="user-select: none;"><span>stenbergniko@outlook.com</span></div>
      <div id="location"><img src="/assets/location-pin.svg" alt="Location logo"><span>{$t['contact-location']}</span></div>
    </div>
    <a id="view-projects" class="anchor hover-highlight" href={resolve("/projects")} onclick={() => setCurrentPage('/projects')} onmouseenter={() => twitchRight = true} onmouseleave={() => twitchRight = false}><span>{$t["home.view-projects"]}</span><img class:twitch={twitchRight} src="/assets/arrow.svg" alt="arrow"></a>
  </div>
  <div id="selfie-image">

  </div>
</div>

<div style="border-bottom: 1px solid rgba(119, 119, 119, 0.4);"></div>

<div id="sub-content">
  <h2>{$t['home.sub-content.knowledge.title']}</h2>
  <div id="categories-outer">
    <div id="categories" use:scrollHorizontal>
      {#each home as { id, titleKey, descriptionKey, badges } (id)}
        <div class="category hover-highlight">
          <h3 style="margin: 0; margin-bottom: 40px;">{$t[titleKey]}</h3>
          <div class="content">
            {#each $t[descriptionKey] as item (item)}
              <span>{item}</span>
            {/each}
            {#if id === 3}
              <div style="display: flex; flex-direction: column;">
                <a class="anchor" style="width: fit-content;" href="https://thenixuchallenge.com/c/">NIXU</a>
                <a class="anchor" style="width: fit-content;" href="https://cs4e.pages.labranet.jamk.fi/ooc/20-Background/">{$t["home.cybersec.description"].slice(-1)}</a>
              </div>
            {/if}
          </div>
          <div style="display: flex; flex: 1 1 0;"></div>
          {#if badges.length >= 1}
            <div style="overflow: hidden;">
              <div id="badges" use:scrollHorizontal>
                {#each badges as badge (badge)}
                  <button class="hover-highlight" onclick={() => zoombadge(badge)}><img class="badge" src={badge} alt="badge"></button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <h2>{$t['home.sub-content.working-on.title']}</h2>
  <div id="current-project" style="display: flex; flex-direction: column;">
    {#if currentProject}
      <h2 style="margin-bottom: 10px;">{currentProject.title}</h2>
      <span style="align-self: center;">{$t[currentProject.descriptionKey]}</span>
      <div id="project-images">
        {#each chosenImages as { image, id }, i (image)}
          {#if $t[currentProject.imageTexts]}
            <span>{$t[currentProject.imageTexts][i]}</span>
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
  #intro-contact {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    gap: 50px;
    padding: 1rem;
    word-wrap: break-word;
    user-select: none;
  }

  #contact div {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  }

  #view-projects {
    justify-content: space-between;
    max-width: 170px;
    height: 50px;
    margin-top: 60px;
    background-color: #0f0f0f; 
    border-radius: 16px;
    padding: 8px 12px;
    transition: background-color 0.2s;
  }

  #view-projects img {
    width: 20px;
    height: 20px;
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
    max-height: 25px;
    height: 100%;
    max-width: 25px;
    width: 100%;
    filter: brightness(0) invert(0.9);
  }

  #intro, #selfie-image {
    max-width: 60%;
    width: 100%;
    height: 100%;
  }

  #selfie-image {
    max-width: 40%;
    padding: 10px;
    border: 1px solid yellow; 
  }

  #sub-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    gap: 100px;
    padding: 40px;
    padding-top: 0;
    user-select: none;
  }

  #sub-content h2 {
    font-weight: 300;
    align-self: center;
    margin: 0;
  }

  #categories {
    display: flex;
    flex-direction: row;
    justify-self: center;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
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
    display: flex;
    flex-direction: column;
    min-width: calc(50% - 40px);
    max-width: 650px;
    width: 100%;
    max-height: 535px;
    height: 100vh;
    padding: 1rem;
    margin: 0 20px;
    border-radius: 12px;
    background-color: rgba(15, 15, 15, 0.8);
  }

  .content {
    padding-left: 1rem;
  }

  .content span {
    position: relative;
    display: block;
    padding-left: 1em;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .content span::before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: 18px;
  }

  #badges {
    display: flex;
    flex-direction: row;
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    width: 120px;
    border-radius: 16px;
    padding: 0;
    margin: 0;
    transition: transform 0.2s;
  }

  #badges button:hover {
    transform: translateY(-4px);
  }

  .badge {
    height: 120px;
    width: 120px;
    border-radius: 16px;
  }

  #zoomedOverlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    user-select: none;
  }

  #zoomedBadge-image {
    height: 600px;
    width: 600px;
  }

  #zoomedImg-image {
    max-height: 80%;
    max-width: 80%;
  }

  #project-images {
    display: flex;
    flex-direction: column;
    align-items: center;
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

    #intro-contact {
      flex-direction: column;
    }

    #intro, #selfie-image {
      max-width: 100%;
    }

    #sub-content {
      gap: 50px;
      padding: 0;
    }

    #categories-outer {
      padding: 0;
    }

    #project-images {
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

    .content span {
      font-size: 14px;
      margin-bottom: 10px;
    }

    #zoomedBadge-image {
      height: 300px;
      width: 300px;
    }
    .current-project-image {
      padding: 5px;
    }
  }

  @media (max-width: 450px) {
    #zoomedBadge-image {
      height: 220px;
      width: 220px;
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