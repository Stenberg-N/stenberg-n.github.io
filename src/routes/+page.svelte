<script lang="ts">
	import { getContext, onMount } from "svelte";
  import { t } from '$lib/i18n';
  import { home } from '$lib/home';
  import { fly } from "svelte/transition";
  import { projects } from '$lib/projects';

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  let zoomedBadge = $state<string | null>(null);
  let currentProject = projects.find(p => p.isCurrent) || null;

  onMount(() => {
    setOnHomeScreen(true);
  });

  const zoombadge = (badge: string) => {
    zoomedBadge = badge;
  }

  const clickOutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent) => {
      if (zoomedBadge && node && !node.contains(event.target as Node)) {
        zoomedBadge = null;
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

{#if zoomedBadge}
  <div id="zoomedBadge" transition:fly={{ y: 100, duration: 200, delay: 100 }}>
    <div use:clickOutside>
      <button id="zoomedBadge-close" class="interactive-el" onclick={() => zoomedBadge = null}><img style="max-height: 20px; max-width: 20px; filter: brightness(0) invert(0.9);" src="/assets/close-x.svg" alt="close"></button>
      <img id="zoomedBadge-image" src={zoomedBadge} alt="badge">
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
      <div id="email" style="user-select: text; word-break: break-all;"><img src="/assets/email-logo.svg" alt="Email logo" style="user-select: none;">stenbergniko@outlook.com</div>
      <div id="location"><img src="/assets/location-pin.svg" alt="Location logo">{$t['contact-location']}</div>
    </div>
  </div>
  <div id="selfie-image">

  </div>
</div>

<div class="divider"></div>

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
                  <button class="interactive-el" onclick={() => zoombadge(badge)}><img class="badge" src={badge} alt="badge"></button>
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
      <div id="current-project-image" class="hover-highlight">
        <img style="object-fit: contain; height: 100%; width: 100%;" src="/images/focusboard1.png" alt="current project">
      </div>
    {/if}
  </div>
</div>

<style>

  .divider {
    border-bottom: 1px solid rgba(119, 119, 119, 0.4);
  }

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

  .interactive-el {
    max-height: 120px;
    height: 100%;
    max-width: 120px;
    border-radius: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .interactive-el:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 24px rgba(255, 70, 70, 0.5);
    cursor: pointer;
    outline: 2px solid rgba(255, 70, 70, 1);
  }

  .badge {
    height: 120px;
    width: 120px;
    border-radius: 16px;
  }

  #zoomedBadge {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  #zoomedBadge-image {
    height: 600px;
    width: 600px;
  }

  #zoomedBadge-close {
    position: absolute;
    top: calc(50% - 350px);
    right: calc(50% - 350px);
    box-shadow: none;
  }

  #current-project-image {
    padding: 40px;
    background-color: rgb(0, 0, 0);
    background-image: linear-gradient(135deg, rgba(255, 70, 70, 0.1) 0%, rgba(15, 15, 15, 0.8) 50%, #181227 100%);
    border-radius: 12px;
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

    #zoomedBadge-close {
      top: calc(50% - 200px);
      right: calc(50% - 200px);
    }
  }

  @media (max-width: 450px) {
    #zoomedBadge-image {
      height: 220px;
      width: 220px;
    }

    #zoomedBadge-close {
      top: calc(50% - 140px);
      right: calc(50% - 140px);
    }
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