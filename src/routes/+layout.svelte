<script lang="ts">
	import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
  import { onNavigate } from '$app/navigation';

  import { lang, t } from '$lib/i18n/i18n';
  import { alerts, sendAlert } from '$lib/alert';
  import { viewport } from '$lib/viewport';

  import '../styles.css';
	import Alert from '../components/Alert.svelte';

  type NavRoute = "/" | "/projects" | "/about-me";

  let { children } = $props();

  let isScrollThreshold = $state<boolean>(false);
  let contentElement = $state<HTMLDivElement | null>(null);
  let alertsContainer = $state<HTMLDivElement | null>(null);
  let raf: number | null = null;
  const navBarElements = [
    {
      get name() { return $t["navigation.anchors.names"][0]; },
      href: "/",
      img: null,
      command: null,
      arialabel: "Navigate to home",
    },
    {
      get name() { return $t["navigation.anchors.names"][1]; },
      href: "/projects",
      img: null,
      command: null,
      arialabel: "Navigate to projects",
    },
    {
      get name() { return $t["navigation.anchors.names"][2]; },
      href: "/about-me",
      img: null,
      command: null,
      arialabel: "Navigate to about me",
    },
    {
      get img() { return $lang === 'en' ? 'FI' : 'EN'; },
      command: () => lang.set($lang === 'en' ? 'fi' : 'en'), 
      href: null,
      name: null,
      arialabel: "Change language",
    },
    {
      img: "/assets/github-logo.svg",
      command: () => sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: "https://github.com/Stenberg-N" }),
      href: null,
      name: null,
      arialabel: "Go to GitHub",
    },
    {
      img: "/assets/email-logo.svg",
      command: () => copyEmail(),
      href: null,
      name: null,
      arialabel: "Copy email",
    },
  ];

  onNavigate(() => {
    return new Promise((resolve) => {
      document.startViewTransition(() => {
        if (contentElement) contentElement.scrollTop = 0;
        resolve();
      });
    });
  });

  $effect(() => {
    if (browser && $lang !== null) {
      document.documentElement.lang = $lang;
      localStorage.setItem('lang', $lang);
    }
  });

  $effect(() => {
    if (!alertsContainer) return;
    alertsContainer.style.bottom = `${$viewport.width <= 318 ? 80 : 20}px`;
  });

  const handleScroll = () => {
    if (!raf) raf = requestAnimationFrame(handleScrollThreshold);
  }

  const handleScrollThreshold = () => {
    if (!contentElement) return;
    raf = null;
    isScrollThreshold = contentElement.scrollTop > 750;
  };
  
  const handleScrollTop = () => {
    if (!contentElement) return;
    contentElement.scrollTop = 0;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("stenbergniko@outlook.com");
      sendAlert({ message: "alert.email.success", isTimer: true, showButtons: false });
    } catch (_) {
      sendAlert({ message: "alert.email.fail", isTimer: true, showButtons: false });
    }
  };
</script>

<svelte:head>
  <link rel="icon" href="/assets/favicon.svg" />
</svelte:head>

<main id="main" class="flex vertical" bind:clientHeight={$viewport.height} bind:clientWidth={$viewport.width}>
  {#if isScrollThreshold}
    <button id="scroll-to-top" aria-label="Scroll back to start" class="button-primary rounder-corners outline" onclick={handleScrollTop} transition:fly={{ y: 36, duration: 200, easing: cubicInOut }}>
      <span class="span-icon img-small-medium" style="mask-image: url('/assets/arrow.svg'); transform: rotate(180deg);"></span>
    </button>
  {/if}

  <div id="alerts" class="flex vertical" bind:this={alertsContainer}>
    {#each $alerts as alert (alert.id)}
      <Alert {alert} />
    {/each}
  </div>

  <nav id="nav-bar" class="flex horizontal">
    <div id="nav-bar-anchors" class="flex horizontal">
      {#each navBarElements.slice(0, 3) as el, i (i)}
        <a aria-label={el.arialabel} class="anchor" class:current-page={el.href === page.url.pathname} href={resolve(el.href as NavRoute)}>
          {el.name}
        </a>
      {/each}
    </div>
    <div class="flex horizontal">
      {#each navBarElements.slice(3) as button, i (i)}
        <button aria-label={button.arialabel} class="button-primary transparent-highlight {i === 0 && 'default-corners'}" onclick={button.command}>
          {#if i !== 0}
            <span class="span-icon img-medium-large" style="mask-image: url('{button.img}');"></span>
          {:else}
            <span style="font-weight: bold;">
              {button.img}
            </span>
          {/if}
        </button>
      {/each}
    </div>
  </nav>

  <div id="content" bind:this={contentElement} onscroll={handleScroll}>
    {@render children()}
  </div>
</main>

<style>
  #main {
    position: fixed;
    inset: 0;
    justify-content: flex-start;
    gap: 0;
    overflow: hidden;

    > #scroll-to-top {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 10000;
      padding: 1rem;
    }
  }

  #nav-bar {
    position: sticky;
    flex-shrink: 0;
    justify-content: center;
    width: 100%;
    height: 5rem;
    padding: 16px;
    background-color: var(--bg-color-primary2);
    border-bottom: 1px solid var(--border-color-primary);

    #nav-bar-anchors {
      gap: 24px;

      .current-page {
        color: var(--primary-highlight-color);
      }
    }

    > div:not(#nav-bar-anchors) {
      position: absolute;
      right: 16px;
    }
  }

  #content {
    overflow-y: auto;
    mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgb(0, 0, 0) 2%, rgb(0, 0, 0) 98%, rgba(0, 0, 0, 0));

    &::-webkit-scrollbar {
      display: block;
    }
  }

  #alerts {
    position: fixed;
    left: 50%;
    bottom: 20px;
    z-index: 10000;
    gap: 1rem;
    transform: translateX(-50%);
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

  @media (max-width: 750px) {
    #nav-bar {
      height: 8rem;
      flex-direction: column;
      justify-content: space-between;

      > div:not(#nav-bar-anchors) {
        position: relative;
        right: unset;
      }
    }
  }
</style>