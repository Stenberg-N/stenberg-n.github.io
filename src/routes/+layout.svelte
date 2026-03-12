<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount, setContext } from 'svelte';
  import { resolve } from '$app/paths';
  import { t, lang } from '$lib/i18n';

  import '../styles.css';
	import Alert from './components/Alert.svelte';

	let { children } = $props();
  let currentPage = $state<string>('/')
  let isAlert = $state<boolean>(false);
  let childAlert = $state<boolean>(false);
  let disableChildAlert = $derived(isAlert);
  let isRedirecting = $state<boolean>(false);
  let alertMessage = $state<string>('');
  let onHomeScreen = $state<boolean>(true);
  let height = $state<number>(40);
  let windowWidth = $state(0);
  let backBtnBottom = $state<string>('unset');
  let hasScrolled = $state<boolean>(false);

  // Contexts, context and helper/wrapper functions

  const setOnHomeScreen = (state: boolean) => {
    onHomeScreen = state;
  };

  const setCurrentPage = (page: string) => {
    currentPage = page;
  };

  const setAlert = (state: boolean) => {
    isAlert = state;
  };

  const setRedirecting = (state: boolean) => {
    isRedirecting = state;
  };

  const propagateAlert = (state: boolean) => {
    childAlert = state;
  };

  setContext('onHomeScreen', { getOnHomeScreen: () => onHomeScreen, setOnHomeScreen });
  setContext('currentPage', { setCurrentPage });
  setContext('alertContext', { propagateAlert, getParentAlert: () => disableChildAlert });

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
  });

  $effect(() => {
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
  });

  $effect(() => {
    if ((isAlert || childAlert) && windowWidth <= 500) backBtnBottom = "120px";
    else if (windowWidth <= 500) backBtnBottom = "25px";
    else backBtnBottom = "unset";
  });


  const redirect = () => {
    isRedirecting = true;
    alertMessage = 'alert.message.github';
    isAlert = true;
  };

  const copyEmail = () => {
    let text = 'stenbergniko@outlook.com';
    navigator.clipboard.writeText(text);
    alertMessage = 'alert.email';
    isAlert = true;
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
  <button id="scroll-to-top" class="interactive-el" onclick={() => window.scrollTo(0, 0)} transition:fly={{ y: 100, duration: 300, delay: 100 }}>
    <img src="/assets/arrow.svg" alt="arrow" style="transform: rotate(180deg); filter: brightness(0) invert(0.9); max-width: 20px; max-height: 20px;">
  </button>
{/if}


{#if isAlert && !childAlert}
  <Alert height={height} isRedirecting={isRedirecting} link="https://github.com/Stenberg-N" alertMessage={alertMessage} setAlert={setAlert} setRedirecting={setRedirecting} />
{/if}

<div id="background"></div>
<div id="grid-background"></div>

{#if !onHomeScreen}
  <a id="back-btn" class="hover-highlight" style="bottom: {backBtnBottom};" href={resolve("/projects")} transition:fly={{ y: 20, duration: 200, delay: 100 }}><img style="transform: rotate(90deg); filter: brightness(0) invert(0.9); max-width: 20px; max-height: 20px;" src="/assets/arrow.svg"alt="Back arrow"></a>
{/if}

<nav id="nav-bar">
  <div id="nav-links">
    <a class="anchor underline-el" class:current={currentPage === '/'} onclick={() => currentPage = '/'} href={resolve("/")}>{$t.home}</a>
    <a class="anchor underline-el" class:current={currentPage === '/projects'} onclick={() => currentPage = '/projects'} href={resolve("/projects")}>{$t.projects}</a>
  </div>
  <div id="link-btns">
    <button id="lang-switch" class="interactive-el" style="color: #f6f6f6; font-weight: 800;" onclick={() => { if ($lang === 'en') { lang.set('fi'); } else lang.set('en'); }}>{$lang === 'en' ? 'FI' : 'EN'}</button>
    <button id="github-link" class="interactive-el" onclick={() => redirect()} class:disabled={childAlert}><img src="/assets/github-logo.svg" alt="GitHub Profile"></button>
    <button id="email-link" class="interactive-el" onclick={() => { if (!isRedirecting) copyEmail(); }} class:disabled={isRedirecting || childAlert}><img src="/assets/email-logo.svg" alt="Email"></button>
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
    background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.5) 90%, rgba(255, 70, 70, 0.12));
    z-index: -1;
  }

  #grid-background {
    position: fixed;
    inset: 0;
    top: 90px;
    z-index: -1;
    background-image:
      repeating-linear-gradient(to right, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 80px),
      repeating-linear-gradient(to bottom, rgba(119,119,119,0.1) 0, rgba(119,119,119,0.1) 1px, transparent 1px, transparent 80px);
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
    margin: 0 auto;
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

  #github-link, #email-link, #lang-switch {
    max-width: 38px;
    max-height: 38px;
  }

  #github-link img, #email-link img {
    max-width: 38px;
    max-height: 38px;
    filter: brightness(0) invert(0.9);
  }

  #back-btn {
    position: fixed;
    top: 24px;
    left: calc(50% - 170px);
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    max-height: 42px;
    max-width: 42px;
    padding: 12px;
    border-radius: 50%;
    background-color: #0f0f0f;
    z-index: 101;
  }

  #back-btn:hover {
    transform: translateY(-4px);
  }

  .disabled {
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

    #back-btn {
      top: unset;
      left: calc(50% - 21px);
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