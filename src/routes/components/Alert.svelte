<script lang="ts">
  import { fly } from 'svelte/transition';
  import { t } from '$lib/i18n';
	import type { Alert } from '$lib/types';
	import { closeAlert } from '$lib/alert';

  let {
    alert,
  }: {
    alert: Alert
  } = $props();

  let timer: number | null = null;

  const startTimer = () => {
    timer = window.setTimeout(() => {
      closeAlert(alert.id);
    }, 3000);
  };

  $effect(() => {
    if (alert.isTimer) startTimer();
    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };
  });

</script>

<div role="alert" class="alert-container hover-highlight" transition:fly={{ y: 100, duration: 400 }}>
  <div class="alert-content">
    <p class="alert-message">{$t[alert.message]}</p>
    <button class="alert-close-btn interactive-el" onclick={() => closeAlert(alert.id)}><img src="/assets/close-x.svg" alt="Close alert"></button>
  </div>
  {#if alert.showButtons}
    <div id="redirect-buttons" style="display: flex; flex-direction: row; gap: 10px; padding-bottom: 5px; margin-top: 20px;">
      <a class="anchor interactive-el" href={alert.link} rel="external">{$t['alert.confirm']}</a>
      <button class="interactive-el" onclick={() => { alert.onCancel(); closeAlert(alert.id); }}>{$t['alert.cancel']}</button>
    </div>
  {/if}
</div>

<style>
  .alert-container {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 350px;
    border-radius: 8px;
    padding: 6px 10px;
    background-color: #0f0f0f;
    overflow: hidden;
  }

  .alert-content {
    display: flex;
    gap: 40px;
  }

  .alert-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    transition: transform 0.2s;
    align-self: center;
  }

  .alert-close-btn img {
    max-width: 12px;
    max-height: 12px;
    filter: brightness(0) invert(0.7);
  }

  #redirect-buttons a, #redirect-buttons button {
    padding: 4px 10px;
    height: 32px;
    background-color: #222;
    color: #f6f6f6;
    font-weight: unset;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    filter: none;
  }

  #redirect-buttons a:hover, #redirect-buttons button:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,1);
    background-color: #333;
  }

  #redirect-buttons a:hover::after, #redirect-buttons a::after {
    width: 0;
    transition: none;
  }

  .alert-close-btn img:hover {
    filter: brightness(1) invert(1);
  }

</style>