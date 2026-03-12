<script lang="ts">
  import { fly } from 'svelte/transition';
  import { t } from '$lib/i18n';
  import { getContext } from 'svelte';

  let {
    alertMessage,
    isRedirecting = false,
    height,
    link,
    setAlert,
    setRedirecting = () => {},
  }: {
    alertMessage: string;
    isRedirecting: boolean;
    height: number;
    link: string | null,
    setAlert: (state: boolean) => void;
    setRedirecting?: (state: boolean) => void;
  } = $props();

  const { propagateAlert } = getContext<{ propagateAlert: (state: boolean) => void; }>('alertContext');
</script>

<div id="alert-container" class="hover-highlight" style="height: {height}px" transition:fly={{ y: 100, duration: 400 }}>
  <div class="alert-content" style="display: flex; flex-direction: row;">
    <p id="alert-message">{$t[alertMessage]}</p>
    <div style="display: flex; flex: 1;"></div>
    <button id="alert-close-btn" class="interactive-el" onclick={() => { setAlert(false); setRedirecting(false); propagateAlert(false); }}><img src="/assets/close-x.svg" alt="Close alert"></button>
  </div>
  {#if isRedirecting}
    <div style="display: flex; flex: 1;"></div>
    <div id="redirect-buttons" style="display: flex; flex-direction: row; gap: 10px; padding-bottom: 5px;">
      <a class="anchor interactive-el" href={link} rel="external">{$t['alert.confirm']}</a>
      <button class="interactive-el" onclick={() => { setAlert(false); setRedirecting(false); propagateAlert(false); }}>{$t['alert.cancel']}</button>
    </div>
  {/if}
</div>

<style>
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

</style>