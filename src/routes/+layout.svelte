<script lang="ts">
  import { fly } from 'svelte/transition';
  import { resolve } from '$app/paths';
  import { t, lang } from '$lib/i18n';
  import { alerts, sendAlert } from '$lib/alert';
  import { page } from '$app/state';
  import { onNavigate } from '$app/navigation';
  import { setContext } from 'svelte';

  import '../styles.css';
	import Alert from '../components/Alert.svelte';

  type NavRoute = "/" | "/projects" | "/about-me";

	let { children } = $props();
  let windowWidth = $state(0);
  let backBtnBottom = $state<string>('unset');
  let alertsContainerBottom = $state<number>(30);
  let hasScrolled = $state<boolean>(false);
  const mainRoutes = ["/", "/projects", "/about-me"];
  let selectedProjectId = $state<number | null>(null);

  onNavigate(({ from, to, complete }) => {
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await complete;
      });
    });
  });

  $effect(() => {
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
  });

  $effect(() => {
    if (windowWidth <= 500) { backBtnBottom = "25px"; alertsContainerBottom = 92 }
    else { backBtnBottom = "unset"; alertsContainerBottom = 30 }
  });

  /**********************************************************************************************************************\
  |
  | Context, Helper & Wrapper functions
  |
  \**********************************************************************************************************************/
    const setSelectedProjectId = (id: number | null) => { selectedProjectId = id; };
    setContext('selectedProject', { getSelectedProjectId: () => selectedProjectId, setSelectedProjectId })

  /**********************************************************************************************************************/
  const copyEmail = () => {
    let text = 'stenbergniko@outlook.com';
    navigator.clipboard.writeText(text);
    sendAlert("alert.email", true, false);
  };

  const handleScroll = () => {
    hasScrolled = window.scrollY > 700;
  };
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<svelte:window onscroll={handleScroll} bind:innerWidth={windowWidth} />

{#if hasScrolled}
  <button id="scroll-to-top" class="button-default vertical-flex-box interactive-el hover-highlight" onclick={() => window.scrollTo(0, 0)} transition:fly={{ y: 100, duration: 300, delay: 100 }}>
    <img src="/assets/arrow.svg" alt="arrow" class="img-small" style="transform: rotate(180deg); filter: brightness(0) invert(0.9);">
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

{#if page.url.pathname !== "/" && selectedProjectId !== null}
  <button id="back-btn" class="button-default vertical-flex-box interactive-el hover-highlight" style="bottom: {backBtnBottom};"
    onclick={() => setSelectedProjectId(null)} transition:fly={{ y: 20, duration: 200, delay: 100 }}
  >
    <img class="img-small" style="transform: rotate(90deg); filter: brightness(0) invert(0.9);" src="/assets/arrow.svg"alt="Back arrow">
  </button>
{/if}

<nav id="nav-bar" class="horizontal-flex-box">
  <div id="nav-links" class="horizontal-flex-box">
    {#each mainRoutes as route, i (i)}
      <a class="anchor underline-el" class:current={page.url.pathname === route} href={resolve(route as NavRoute)} onclick={() => setSelectedProjectId(null)}>{$t["navigation.anchors.names"][i]}</a>
    {/each}
  </div>
  <div id="link-btns" class="horizontal-flex-box" style="gap: 8px;">
    <button id="lang-switch" class="button-default interactive-el" style="color: #f6f6f6; font-weight: 800;" onclick={() => { if ($lang === 'en') { lang.set('fi'); } else lang.set('en'); }}>{$lang === 'en' ? 'FI' : 'EN'}</button>
    <button id="github-link" class="button-default interactive-el" onclick={() => sendAlert("alert.message.github", false, true, "https://github.com/Stenberg-N")}>
      <img src="/assets/github-logo.svg" alt="GitHub Profile" class="img-large">
    </button>
    <button id="email-link" class="button-default interactive-el" onclick={() => copyEmail()}><img src="/assets/email-logo.svg" alt="Email" class="img-large"></button>
  </div>
</nav>

<main class="content vertical-flex-box">
  {@render children()}
</main>

<style>
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
      repeating-linear-gradient(to right, rgba(119,119,119,0.15) 0, rgba(119,119,119,0.15) 1px, transparent 1px, transparent 80px),
      repeating-linear-gradient(to bottom, rgba(119,119,119,0.15) 0, rgba(119,119,119,0.15) 1px, transparent 1px, transparent 80px);
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

  .content {
    align-items: unset;
    flex: 1 1 0;
    justify-self: center;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    margin-top: 210px;
    padding: 2rem 1rem;
    gap: 100px;
    background-color: #0f0f0f;
    z-index: 1;
    overflow-x: hidden;
  }

  #nav-links {
    position: absolute;
    left: 50%;
    gap: 40px;
    transform: translateX(-50%);
  }

  #link-btns button:hover {
    transform: translateY(-4px) scale(1.05);
  }

  #github-link, #email-link {
    width: 48px;
    height: 48px;
    padding: 6px;
    border-radius: 50%;
  }
  #lang-switch {
    width: 32px;
    height: 24px;
  }

  #github-link img, #email-link img {
    filter: brightness(0) invert(0.9);
  }

  #back-btn {
    position: fixed;
    top: 24px;
    left: calc(50% - 170px);
    height: 42px;
    width: 42px;
    padding: 12px;
    border-radius: 50%;
    background-color: #0f0f0f;
    z-index: 101;
  }

  .current::after {
    width: 100%;
  }

  #scroll-to-top {
    position: fixed;
    bottom: 9px;
    right: 15px;
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: #0f0f0f;
    border-radius: 12px;
    z-index: 1;
  }

  .alerts-container {
    position: fixed;
    z-index: 1000;
    left: 50%;
    justify-content: unset;
    transform: translateX(-50%);
    gap: 12px;
    pointer-events: none;
  }

  .alerts-container > * {
    pointer-events: auto;
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
    .content {
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
      left: calc(50% - 21px);
    }

    #nav-links {
      align-self: flex-end;
      width: 100%;
    }

    #link-btns {
      align-self: flex-start;
    }
  }
</style>