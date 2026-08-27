<script lang="ts">
  import { fly } from 'svelte/transition';
  import { page } from '$app/state';
  import { onNavigate } from '$app/navigation';
  import { setContext } from 'svelte';
  import { resolve } from '$app/paths';

  import { t, lang } from '$lib/i18n';
  import { alerts, sendAlert } from '$lib/alert';

  import '../styles.css';
	import Alert from '../components/Alert.svelte';

  type NavRoute = "/" | "/projects" | "/about-me";

	let { children } = $props();
  let windowWidth = $state(0);
  let alertsContainerBottom = $state<number>(30);
  let isScrollThreshold = $state<boolean>(false);
  const mainRoutes = ["/", "/projects", "/about-me"];
  let selectedProjectId = $state<number | null>(null);

  const navBarButtons = [
    { id: "lang-switch", img: null, onClick: () => $lang === 'en' ? lang.set('fi') : lang.set('en') },
    { id: "github-link", img: "/assets/github-logo.svg", onClick: () => sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true,link: "https://github.com/Stenberg-N"}) },
    { id: "email-link", img: "/assets/email-logo.svg", onClick: () => copyEmail() },
  ];

  onNavigate(() => {
    return new Promise((resolve) => {
      document.startViewTransition(() => {
        resolve();
      });
    });
  });

  $effect(() => {
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
  });

  $effect(() => {
    if (windowWidth <= 620) alertsContainerBottom = 92;
    else alertsContainerBottom = 30;
  });

  /**********************************************************************************************************************\
  |
  | Context, Helper & Wrapper functions
  |
  \**********************************************************************************************************************/
  const setSelectedProjectId = (id: number | null) => { selectedProjectId = id; };
  setContext('selectedProject', { getSelectedProjectId: () => selectedProjectId, setSelectedProjectId });
  setContext('windowWidth', () => windowWidth);

  /**********************************************************************************************************************/

  const copyEmail = () => {
    const text = 'stenbergniko@outlook.com';
    navigator.clipboard.writeText(text);
    sendAlert({ message: "alert.email", isTimer: true, showButtons: false });
  };

  const handleScroll = () => {
    isScrollThreshold = window.scrollY > 700;
  };
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<svelte:window onscroll={handleScroll} bind:innerWidth={windowWidth} />

{#if isScrollThreshold}
  <button id="scroll-to-top" class="button-default vertical-flex-box interactive-el" onclick={() => window.scrollTo(0, 0)} transition:fly={{ y: 100, duration: 300, delay: 100 }}>
    <img src="/assets/arrow.svg" alt="arrow" class="img-small" style="transform: rotate(180deg);" />
  </button>
{/if}

<div class="alerts-container vertical-flex-box" style="bottom: {alertsContainerBottom}px;">
  {#each $alerts as alert (alert.id)}
    <div>
      <Alert {alert} />
    </div>
  {/each}
</div>

<div id="background"></div>
<div id="grid-background"></div>

{#if page.route.id === "/projects/[slug]"}
  <a id="back-btn" class="vertical-flex-box interactive-el"
    href={resolve("/projects")} onclick={() => setSelectedProjectId(null)} transition:fly={{ y: 20, duration: 200, delay: 100 }}
  >
    <img class="img-small" style="transform: rotate(90deg); filter: brightness(0) invert(0.9);" src="/assets/arrow.svg" alt="Back arrow" />
  </a>
{/if}

<nav id="nav-bar" class="horizontal-flex-box">
  <div id="nav-links" class="horizontal-flex-box">
    {#each mainRoutes as route, i (i)}
      <a class="anchor underline-el" class:current={page.url.pathname === route} href={resolve(route as NavRoute)} onclick={() => setSelectedProjectId(null)}>{$t["navigation.anchors.names"][i]}</a>
    {/each}
  </div>
  <div id="link-btns" class="horizontal-flex-box">
    {#each navBarButtons as button, i (button.id)}
      <button id={button.id} class="button-transparent interactive-el" onclick={() => button.onClick()}>
        {#if i === 0}
          {$lang === 'en' ? 'FI' : 'EN'}
        {:else}
          <img src={button.img} alt={i === 1 ? 'GitHub' : i === 2 ? 'Email' : ''} class="img-large" />
        {/if}
      </button>
    {/each}
  </div>
</nav>

<main id="main-content" class="vertical-flex-box">
  {@render children()}
</main>

<style>
  .current::after {
    width: 100%;
  }

  #background {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 15, 15, 0.5);
    z-index: -1;
  }

  #grid-background {
    position: fixed;
    inset: 0;
    top: 90px;
    z-index: -1;
    background-image:
      repeating-linear-gradient(to right, rgba(34, 34, 34, 0.8) 0, rgba(34, 34, 34, 0.8) 2px, transparent 2px, transparent 80px),
      repeating-linear-gradient(to bottom, rgba(34, 34, 34, 0.8) 0, rgba(34, 34, 34, 0.8) 2px, transparent 2px, transparent 80px);
    transform: translateX(-1px);
  }

  #nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    justify-content: flex-end;
    width: 100%;
    height: 90px;
    z-index: 100;
    padding: 1rem;
    background-color: rgba(15,15,15,0.8);
    backdrop-filter: blur(32px);
    user-select: none;
  }

  #nav-links {
    position: absolute;
    left: 50%;
    gap: 40px;
    transform: translateX(-50%);
  }

  #link-btns {
    gap: 8px;

    button:hover {
      transform: translateY(-2px) scale(1.05);
    }

    button:not(:first-child) {
      width: 48px;
      height: 48px;
      padding: 6px;
      border-radius: 50%;
    }
    button:first-child {
      width: 32px;
      height: 24px;
    }
  }

  #main-content {
    align-items: unset;
    justify-content: flex-start;
    justify-self: center;
    max-width: 1200px;
    width: 100%;
    margin: 210px auto 120px;
    padding: 4rem 1rem;
    gap: 100px;
    background-color: #0f0f0f;
    z-index: 1;
    overflow-x: hidden;
  }

  #back-btn {
    position: fixed;
    top: 24px;
    left: calc(50% - 216px);
    height: 42px;
    width: 42px;
    padding: 12px;
    border-radius: 50%;
    background-color: #0f0f0f;
    outline: 1px solid #333;
    z-index: 101;

    &:hover {
      background-color: #333;
    }
  }

  #scroll-to-top {
    position: fixed;
    bottom: 9px;
    right: 15px;
    width: 50px;
    height: 50px;
    padding: 5px;
    border-radius: 12px;
    background-color: #0f0f0f;
    z-index: 1;
    outline: 1px solid #333;

    &:hover {
      background-color: #333;
    }
  }

  .alerts-container {
    position: fixed;
    z-index: 1000;
    left: 50%;
    justify-content: unset;
    transform: translateX(-50%);
    gap: 12px;
    pointer-events: none;

    > * {
      pointer-events: auto;
    }
  }

  :root::view-transition-old(root), :root::view-transition-new(root) {
    animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  :root::view-transition-old(root) {
    animation: fade-out 0.3s;
  }
  :root::view-transition-new(root) {
    animation: fade-in 0.3s;
  }

  @keyframes fade-out {
    to { opacity: 0; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
  }

  @media (max-width: 1200px) {
    #main-content {
      width: 85%;
    }
  }

  @media (max-width: 620px) {
    #nav-bar {
      justify-content: center;
      height: 150px;
    }

    #back-btn {
      top: unset;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
    }

    #nav-links {
      align-self: flex-end;
      width: 100%;
    }

    #link-btns {
      align-self: flex-start;
    }
  }

  @media (max-width: 420px) {
    #main-content { width: 100%; }
  }
</style>