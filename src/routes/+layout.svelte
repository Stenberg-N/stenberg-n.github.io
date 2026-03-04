<script lang="ts">
  import { fly } from 'svelte/transition';
  import { setContext } from 'svelte';
  import { resolve } from '$app/paths';

  import '../styles.css';

  setContext('onHomeScreen', { getOnHomeScreen: () => onHomeScreen, setOnHomeScreen });

	let { children } = $props();
  let isAlert = $state<boolean>(false);
  let isRedirecting = $state<boolean>(false);
  let alertMessage = $state<string>('');
  let onHomeScreen = $state<boolean>(true);
  let height = $state<number>(40);

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
    alertMessage = 'Continue to GitHub?';
    isAlert = true;
  }

  function copyEmail() {
    let text = 'stenbergniko@outlook.com';
    navigator.clipboard.writeText(text);
    alertMessage = 'Email copied!';
    isAlert = true;
  }

  function setOnHomeScreen(state: boolean) {
    onHomeScreen = state;
  }
</script>

<svelte:head>
	<link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

{#if isAlert}
  <div id="alert-container" style="height: {height}px" transition:fly={{ y: 100, duration: 400, delay: 100 }}>
    <div class="alert-content" style="display: flex; flex-direction: row;">
      <p id="alert-message" style="margin: 0;">{alertMessage}</p>
      <div style="display: flex; flex: 1;"></div>
      <button id="alert-close-btn" class="interactive-el" onclick={() => {isAlert = false; isRedirecting = false; }}><img src="/assets/close-x.svg" alt="Close alert"></button>
    </div>
    {#if isRedirecting}
      <div style="display: flex; flex: 1;"></div>
      <div id="redirect-buttons" style="display: flex; flex-direction: row; gap: 10px; padding-bottom: 5px;">
        <a class="anchor interactive-el" href="https://github.com/Stenberg-N">Confirm</a>
        <button class="interactive-el" onclick={() => { isAlert = false; isRedirecting = false; }}>Cancel</button>
      </div>
    {/if}
  </div>
{/if}

<div id="grid-background"></div>

<nav id="nav-bar">
  {#if !onHomeScreen}
    <a id="back-btn" class="interactive-el" style="position: fixed; left: 16px; max-height: 24px;" href={resolve("/projects")} transition:fly={{ y: 20, duration: 200, delay: 100 }}><img style="transform: rotate(90deg); max-width: 24px; max-height: 24px;" src="/assets/arrow.svg"alt="Back arrow"></a>
  {/if}
  <div style="display: flex; flex: 1; justify-content: center; gap: 40px;">
    <a class="anchor" href={resolve("/")}>Home</a>
    <a class="anchor" href={resolve("/projects")}>Projects</a>
  </div>
  <button id="github-link" class="interactive-el" style="position: fixed; right: 74px;" onclick={() => redirect()}><img src="/assets/github-logo.svg" alt="GitHub Profile"></button>
  <button id="email-link" class="interactive-el" style="position: fixed; right: 16px;" onclick={() => { if (!isRedirecting) copyEmail(); }} class:disabled={isRedirecting}><img src="/assets/email-logo.svg" alt="Email"></button> 
</nav>

<main class="content">
  {@render children()}
</main>

<style>
  #grid-background {
    position: fixed;
    top: 70px;
    left: 0;
    height: calc(100vh - 70px);
    width: 100vw;
    z-index: -1;
    background-image:
      repeating-linear-gradient(to right, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 80px),
      repeating-linear-gradient(to bottom, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 80px);
    background-size: 100% 100%;
  }

  #nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
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
    margin-top: 70px;
    min-height: calc(100vh - 78px);
    padding: 1rem;
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
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
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
</style>