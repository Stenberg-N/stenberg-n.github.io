<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount, setContext } from 'svelte';
  import { resolve } from '$app/paths';
  import { t, lang } from '$lib/i18n';

  import '../styles.css';

  setContext('onHomeScreen', { getOnHomeScreen: () => onHomeScreen, setOnHomeScreen });

	let { children } = $props();
  let currentPage = $state<string>('/')
  let isAlert = $state<boolean>(false);
  let isRedirecting = $state<boolean>(false);
  let alertMessage = $state<string | string[]>('');
  let onHomeScreen = $state<boolean>(true);
  let height = $state<number>(40);
  let hasScrolled = $state<boolean>(false);

  onMount(() => {
    currentPage = window.location.pathname;
  });

  $effect(() => {
    if (isAlert && !isRedirecting) {
      setTimeout(() => { isAlert = false; isRedirecting = false; }, 3000);
    }
  });

  $effect(() => {
    if (isRedirecting) height = 80; else height = 40;
  })

  function redirect() {
    isRedirecting = true;
    alertMessage = $t['alert.message'];
    isAlert = true;
  }

  function copyEmail() {
    let text = 'stenbergniko@outlook.com';
    navigator.clipboard.writeText(text);
    alertMessage = $t['alert.email'];
    isAlert = true;
  }

  function setOnHomeScreen(state: boolean) {
    onHomeScreen = state;
  }

  function handleScroll() {
    hasScrolled = window.scrollY > 700;
    console.log("scroll", hasScrolled);
  }
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<svelte:window onscroll={handleScroll} />

{#if hasScrolled}
  <button id="scroll-to-top" class="interactive-el" onclick={() => window.scrollTo(0, 0)} transition:fly={{ y: 100, duration: 300, delay: 100 }}>
    <img src="/assets/arrow.svg" alt="arrow" style="transform: rotate(180deg); filter: brightness(0) invert(0.9); max-width: 20px; max-height: 20px;">
  </button>
{/if}

{#if isAlert}
  <div id="alert-container" style="height: {height}px" transition:fly={{ y: 100, duration: 400, delay: 100 }}>
    <div class="alert-content" style="display: flex; flex-direction: row;">
      <p id="alert-message">{alertMessage}</p>
      <div style="display: flex; flex: 1;"></div>
      <button id="alert-close-btn" class="interactive-el" onclick={() => {isAlert = false; isRedirecting = false; }}><img src="/assets/close-x.svg" alt="Close alert"></button>
    </div>
    {#if isRedirecting}
      <div style="display: flex; flex: 1;"></div>
      <div id="redirect-buttons" style="display: flex; flex-direction: row; gap: 10px; padding-bottom: 5px;">
        <a class="anchor interactive-el" href="https://github.com/Stenberg-N">{$t['alert.confirm']}</a>
        <button class="interactive-el" onclick={() => { isAlert = false; isRedirecting = false; }}>{$t['alert.cancel']}</button>
      </div>
    {/if}
  </div>
{/if}

<div id="background"></div>
<div id="grid-background"></div>

<nav id="nav-bar">
  {#if !onHomeScreen}
    <a id="back-btn" class="interactive-el" style="position: fixed; left: 16px; max-height: 24px;" href={resolve("/projects")} transition:fly={{ y: 20, duration: 200, delay: 100 }}><img style="transform: rotate(90deg); max-width: 24px; max-height: 24px;" src="/assets/arrow.svg"alt="Back arrow"></a>
  {/if}
  <div id="nav-links">
    <a class="anchor" class:current={currentPage === '/'} onclick={() => currentPage = '/'} href={resolve("/")}>{$t.home}</a>
    <a class="anchor" class:current={currentPage === '/projects'} onclick={() => currentPage = '/projects'} href={resolve("/projects")}>{$t.projects}</a>
  </div>
  <div id="link-btns">
    <button id="lang-switch" class="interactive-el" style="color: #f6f6f6; font-weight: 800;" onclick={() => { if ($lang === 'en') { lang.set('fi'); } else lang.set('en'); }}>{$lang === 'en' ? 'FI' : 'EN'}</button>
    <button id="github-link" class="interactive-el" onclick={() => redirect()}><img src="/assets/github-logo.svg" alt="GitHub Profile"></button>
    <button id="email-link" class="interactive-el" onclick={() => { if (!isRedirecting) copyEmail(); }} class:disabled={isRedirecting}><img src="/assets/email-logo.svg" alt="Email"></button>
  </div>
</nav>

<main class="content">
  {@render children()}
</main>

<style>
  #background {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0);
    background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.5) 90%, rgba(255, 70, 70, 0.1));
    z-index: -1;
  }

  #grid-background {
    position: fixed;
    inset: 0;
    top: 90px;
    z-index: -1;
    background-image:
      repeating-linear-gradient(to right, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 101px),
      repeating-linear-gradient(to bottom, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 101px);
  }

  #nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 100;
    padding: 1rem;
    background-color: rgba(15,15,15,0.8);
    backdrop-filter: blur(32px);
    user-select: none;
  }

  .content {
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex: 1;
    justify-content: center;
    gap: 40px;
  }

  #link-btns {
    position: fixed;
    right: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    gap: 20px;
    width: 138px;
  }

  #github-link img, #email-link img, #back-btn img {
    max-width: 38px;
    max-height: 38px;
    filter: brightness(0) invert(0.9);
  }

  #alert-container {
    position: fixed;
    bottom: 20px;
    left: calc(50% - 125px);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 250px;
    width: 100%;
    max-height: 80px;
    border-radius: 8px;
    padding: 6px 10px;
    background-color: #222;
    box-shadow: 0 8px 24px rgba(0,0,0,0.8);
    border: 1px solid rgba(119,119,119,0.4);
    transition: border 0.2s;
  }

  #alert-container:hover {
    border-color: rgba(255, 70, 70, 1);
  }

  #alert-close-btn {
    width: 12px;
    height: 12px;
    transition: transform 0.2s;
    align-self: center;
  }

  #alert-close-btn img {
    max-width: 12px;
    max-height: 12px;
    filter: brightness(0) invert(0.7);
  }

  #redirect-buttons a, #redirect-buttons button {
    padding: 4px 10px;
    height: 28px;
    background-color: #333;
    color: #f6f6f6;
    font-weight: unset;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    filter: none;
  }

  #redirect-buttons a:hover, #redirect-buttons button:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,1);
    background-color: #444;
  }

  #redirect-buttons a:hover::after, #redirect-buttons a::after {
    width: 0;
    transition: none;
  }

  #alert-close-btn img:hover {
    filter: brightness(1) invert(1);
  }

  #email-link.disabled {
    filter: brightness(0) invert(0.3);
    cursor: not-allowed;
    transform: none;
  }

  .current::after {
    width: 100%;
  }

  #scroll-to-top {
    position: fixed;
    bottom: 9px;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 50px;
    width: 100%;
    max-height: 50px;
    height: 100%;
    padding: 5px;
    background-color: #0f0f0f;
    border-radius: 12px;
    border: 1px solid rgba(119, 119, 119, 0.4);
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    transition: transform 0.2s, box-shadow 0.2s;
    z-index: 1;
  }

  #scroll-to-top:hover {
    box-shadow: 0 8px 24px rgba(255, 70, 70, 0.3);
    border-color: rgba(255, 70, 70, 1);
  }

  @media (max-width: 1200px) {
    .content {
      width: 85%;
    }
  }

  @media (max-width: 500px) {
    #nav-bar {
      height: 150px;
    }

    #nav-links {
      align-self: flex-end;
    }

    #link-btns {
      right: calc(50% - 69px);
      align-self: flex-start;
    }
  }
</style>