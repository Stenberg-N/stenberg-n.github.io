<script lang="ts">
	import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { resolve } from '$app/paths';
  
  import { t } from '$lib/i18n';
  import { home } from '$lib/home';
  import { projects } from '$lib/projects';
	import { sendAlert } from "$lib/alert";
  import { handleClickOutside, handleHorizontalScroll } from "$lib/actions";

  let currentProject = projects.find(p => p.isCurrent) || null;
  const { chosenImages = [], imageNotes = [] } = currentProject || {};
  let twitchRight = $state<boolean>(false);

  let zoomedBadge = $state<string | null>(null);
  let zoomedImage = $state<string | null>(null);
  let zoomedImageId = $state<number | null>(null);
  const zoomedImageNote = $derived.by(() => { return zoomedImageId !== null ? imageNotes.find(note => note.id === zoomedImageId) : null; });
  let zoomedContainer = $state<HTMLDivElement | null>(null);

  const contactContainerEls = [
    { img: "/assets/github-logo.svg", alt: "Github", content: "Stenberg-N", command: () => sendAlert("alert.message.github", false, true, "https://github.com/Stenberg-N") },
    { img: "/assets/linkedin-logo.svg", alt: "LinkedIn", content: "LinkedIn", command: () => sendAlert("alert.message.linkedin", false, true, "https://www.linkedin.com/in/niko-stenberg-543982408") },
    { img: "/assets/email-logo.svg", alt: "Email", content: "stenbergniko@outlook.com", command: () => {} },
    { img: "/assets/location-pin.svg", alt: "Location", content: "contact-location", command: () => {} },
  ];

  const zoomElement = (element: "badge" | "image", image: string, id?: number) => {
    (() => element === "badge" ? zoomedBadge = image : zoomedImage = image)();
    if (id) zoomedImageId = id;
  };

</script>

{#if zoomedBadge || zoomedImage}
  <div role="dialog" tabindex="0" id="zoomedImageOverlay" bind:this={zoomedContainer} transition:fade={{ duration: 300, easing: cubicInOut }} onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedImage = null; zoomedBadge = null; }}}>
    <div id="zoomedContainer">
      <button class="zoomedImg-close hover-highlight" in:fly={{ y: -40, duration: 400, delay: 100, easing: cubicInOut }}
        onclick={() => { if (zoomedImage) {zoomedImage = null; zoomedImageId = null; } if (zoomedBadge) { zoomedBadge = null } }}
      >
        <img src="/assets/close-x.svg" alt="close">
      </button>
      <div class="image-wrapper" in:fly={{ y: 40, duration: 400, delay: 100, easing: cubicInOut }}>
        {#if zoomedBadge}
          <img id="zoomedBadge-image" src={zoomedBadge} alt="badge" use:handleClickOutside={{ requirements: [zoomedImage, zoomedBadge], onOutsideClick: () => { zoomedImage = null; zoomedBadge = null; zoomedImageId = null; } }}>
        {:else if zoomedImage}
          <img id="zoomedImg-image" src={zoomedImage} alt="Current project" use:handleClickOutside={{ requirements: [zoomedImage, zoomedBadge], onOutsideClick: () => { zoomedImage = null; zoomedBadge = null; zoomedImageId = null; } }}>
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
    <div id="home-intro-title">
      {#each ["intro-title1", "intro-title2", "intro-title3"] as title, i (i)}
        <h1 class="intro-title">{$t[title]}</h1>
      {/each}
      <p>{$t['intro-paragraph']}</p>
    </div>
    <div id="home-contact" class="vertical-flex-box">
      {#each contactContainerEls as el, i (i)}
        <div class="horizontal-flex-box">
          <img src={el.img} alt={el.alt} class="img-medium" style="filter: {i === 1 ? 'unset' : 'brightness(0) invert(0.9)'};">
          {#if [0, 1].includes(i)}
          <button class="transparent-button-bold underline-el" onclick={() => el.command()}>{el.content}</button>
          {:else}
            <span>{i === 3 ? $t[el.content] : el.content}</span>
          {/if}
        </div>
      {/each}
    </div>
    <a id="home-view-projects" class="anchor hover-highlight" href={resolve("/projects")} onmouseenter={() => twitchRight = true} onmouseleave={() => twitchRight = false}>
      <span>{$t["home.view-projects"]}</span>
      <img class:twitch={twitchRight} src="/assets/arrow.svg" alt="arrow" class="img-small">
    </a>
  </div>
  <div id="selfie-image" class="image-wrapper">
    <img src="/images/selfie.jpg" alt="Selfie" />
  </div>
</div>

<div class="border-divider"></div>

<div id="home-sub-content" class="vertical-flex-box">
  <h2>{$t['home.sub-content.knowledge.title']}</h2>
  <div id="home-categories-outer">
    <div id="home-categories" class="horizontal-flex-box" use:handleHorizontalScroll>
      {#each home as { id, titleKey, descriptionKey, badges } (id)}
        <div class="home-category vertical-flex-box hover-highlight">
          <h3 style="margin: 0; margin-bottom: 40px;">{$t[titleKey]}</h3>
          <div class="home-category-content vertical-flex-box">
            {#each $t[descriptionKey] as item (item)}
              <span>{item}</span>
            {/each}
            {#if id === 3}
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <button class="transparent-button-bold underline-el" style="width: fit-content;" onclick={() => sendAlert("alert.message.nixu", false, true, "https://thenixuchallenge.com/c/")}>NIXU</button>
                <button class="transparent-button-bold underline-el" style="width: fit-content;" onclick={() => sendAlert("alert.message.jamk", false, true, "https://cs4e.pages.labranet.jamk.fi/ooc/20-Background/")}>{$t["home.cybersec.description"].slice(-1)}</button>
              </div>
            {/if}
          </div>
          <div style="display: flex; flex: 1 1 0;"></div>
          {#if badges.length >= 1}
            <div style="overflow: hidden;">
              <div id="home-badges" class="horizontal-flex-box" use:handleHorizontalScroll={{ multiplier: 0.5 }}>
                {#each badges as badge (badge)}
                  <button class="vertical-flex-box hover-highlight interactive-el" onclick={() => zoomElement("badge", badge)}><img class="badge" src={badge} alt="badge"></button>
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
      <h2 style="margin-bottom: 10px;">{currentProject.title}</h2>
      <span>{$t[currentProject.descriptionKey]}</span>
      <a id="view-current-project" class="anchor hover-highlight" style="justify-content: center;" href={resolve("/projects/fin-radar")}>
        <span>{$t["home.sub-content.view-current-project"]}</span>
      </a>
      <div id="current-project-images" class="vertical-flex-box">
        {#each chosenImages as { image, id }, i (image)}
          {#if $t[currentProject.imageTexts]}
            <span>{$t[currentProject.imageTexts][i]}</span>
          {/if}
          <div
            role="button"
            tabindex="0"
            class="current-project-image hover-highlight interactive-el image-wrapper"
            onclick={() => zoomElement("image", image, id)}
            onkeydown={(e) => {if (e.key === 'Enter') zoomElement("image", image, id)}}
          >
            <img src={image} alt="Current project image {i}" />
          </div>
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

  #home-intro {
    max-width: 60%;
    width: 100%;
  }

  #home-intro-title h1 {
    margin: 0;
    font-family: 'Inter';
    paint-order: stroke fill;
    font-size: clamp(2.5rem, 2.65cqw, 3rem);
  }
  #home-intro-title h1:not(:nth-child(2)) {
    -webkit-text-stroke: 1px #f6f6f6;
    color: #0f0f0f;
    font-size: clamp(2rem, 2.15cqw, 2.5rem);
  }

  #home-intro-title p {
    padding-left: 2rem;
    margin-top: 20px;
    font-size: clamp(0.875rem, 1.08cqw, 1rem);
  }

  #home-contact {
    gap: 12px;
    margin-top: 40px;
  }

  #home-contact div {
    justify-content: flex-start;
    width: 100%;
    gap: 20px;
  }

  #home-view-projects {
    justify-content: space-between;
    max-width: 170px;
    height: 50px;
    margin-top: 60px;
    background-color: rgb(51, 51, 51, 0.8); 
    border-radius: 16px;
    outline: none;
    padding: 8px 12px;
  }

  .twitch {
    animation: twitch-left 0.5s;
  }

  #home-view-projects img {
    filter: brightness(0) invert(0.9);
    transform: rotateZ(-90deg);
  }

  #home-view-projects:hover {
    background-color: rgba(255, 70, 70, 1);
  }

  #home-view-projects::after {
    width: 0;
  }

  #selfie-image {
    max-width: 40%;
    width: 100%;
    padding: 1rem;
  }

  #home-sub-content {
    align-items: unset;
    gap: 100px;
    user-select: none;
  }

  #home-sub-content h2 {
    font-weight: 300;
    align-self: center;
    text-align: center;
    margin: 0;
  }

  #home-categories {
    justify-content: unset;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    height: 580px;
    padding: 6px 10px 30px;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0) 5%, rgb(0, 0, 0) 95%, rgba(0, 0, 0, 0));
  }

  #home-categories::-webkit-scrollbar-track {
    margin: 0 40px;
  }

  #home-categories-outer {
    overflow: hidden;
    padding: 0 50px;
  }

  .home-category {
    align-items: unset;
    min-width: calc(50% - 40px);
    max-width: 650px;
    width: 100%;
    height: 100%;
    padding: 1rem;
    margin: 0 20px;
    border-radius: 4px;
    background-color: rgba(15, 15, 15, 0.8);
  }

  .home-category h3 {
    font-size: clamp(1rem, 1.08cqw, 1.125rem);
  }

  #home-categories .home-category-content {
    align-items: flex-start;
    padding-left: 1rem;
    gap: 1rem;
  }

  #home-categories .home-category-content span {
    position: relative;
    display: block;
    padding-left: 1em;
    font-size: clamp(0.875rem, 1.08cqw, 1.125rem);
  }

  #home-categories .home-category-content span::before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: clamp(0.875rem, 1.08cqw, 1.125rem);
  }

  #home-badges {
    justify-content: flex-start;
    max-height: 180px;
    gap: 10px;
    padding: 30px;
    overflow-x: auto;
    overflow-y: hidden;
  }

  #home-badges::-webkit-scrollbar-track {
    margin-top: 0;
  }

  #home-badges button {
    height: 120px;
    width: 120px;
    border-radius: 16px;
    padding: 0;
    margin: 0;
  }

  #home-badges .badge {
    height: 120px;
    width: 120px;
    border-radius: 16px;
  }

  #view-current-project {
    align-self: center;
    max-width: 160px;
    padding: 16px;
    margin-top: 2rem;
    border-radius: 16px;
    background-color: rgba(51, 51, 51, 0.8);
    outline: none;
  }
  #view-current-project:hover {
    background-color: rgb(255, 70, 70);
  }

  #current-project span {
    align-self: center;
    text-align: center;
    font-size: clamp(0.875rem, 1.08cqw, 1rem);
  }

  #current-project-images {
    justify-content: unset;
    margin-top: 80px;
    padding: 0 80px;
  }

  .current-project-image {
    background-color: #0f0f0f;
    margin-top: 20px;
    border: 0;
    border-radius: 4px;
    
    img {
      object-fit: contain;
    }
  }
  .current-project-image:not(:last-child) {
    margin-bottom: clamp(40px, 4.5cqw, 80px);
  }

  @media (max-width: 1200px) {
    #home-sub-content {
      gap: 50px;
      padding: 0;
    }

    #home-categories-outer {
      padding: 0;
    }

    #current-project-images {
      padding: 0 30px;
    }

    .current-project-image {
      background-size: contain;
      max-height: 550px;
    }
  }

  @media (max-width: 1000px) {
    #home-intro-contact {
      flex-direction: column;
    }

    #home-intro {
      max-width: 100%;
    }

    #selfie-image {
      max-width: 500px;
    }
  }

  @media (max-width: 750px) {
    .home-category {
      min-width: calc(100% - 40px);
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