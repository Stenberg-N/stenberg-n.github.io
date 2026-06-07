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
  const duration = 3000;
  let remainingTime = $state<number>(duration);
  let startTime: number;
  let intervalId: number | null = null;

  const startTimer = () => {
    startTime = Date.now();

    timer = window.setTimeout(() => {
      closeAlert(alert.id);
    }, remainingTime);

    intervalId = window.setInterval(() => {
      const newRemaining = Math.max(0, remainingTime - (Date.now() - startTime));

      if (newRemaining <= 0 && intervalId !== null) {
        remainingTime = 0;
        clearInterval(intervalId);
        intervalId = null;
      } else {
        remainingTime = newRemaining;
      }
    }, 500);
  };

  $effect(() => {
    if (alert.isTimer) startTimer();
    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };
  });

</script>

<div role="alert" class="alert-container vertical-flex-box hover-highlight" transition:fly={{ y: 100, duration: 400 }}>
  <div class="alert-content horizontal-flex-box">
    <p class="alert-message">{$t[alert.message]}</p>
    <button class="alert-close-btn vertical-flex-box transparent-button" onclick={() => closeAlert(alert.id)}><img src="/assets/close-x.svg" alt="Close alert"></button>
  </div>
  {#if alert.showButtons}
    <div class="redirect-buttons horizontal-flex-box">
      <a class="button-default anchor interactive-el" href={alert.link} rel="external">{$t['alert.confirm']}</a>
      <button class="button-default interactive-el" onclick={() => { alert.onCancel(); closeAlert(alert.id); }}>{$t['alert.cancel']}</button>
    </div>
  {/if}
</div>

<style>
  .alert-container {
    position: relative;
    max-width: 350px;
    border-radius: 8px;
    padding: 12px;
    background-color: #0f0f0f;
    overflow: hidden;
  }
  .alert-container:hover {
    background-color: #0f0f0f;
  }

  .alert-content {
    justify-content: space-between;
    gap: 40px;
  }

  .alert-close-btn {
    width: 24px;
    height: 24px;
    align-self: center;
    border-radius: 50%;
  }
  .alert-close-btn:hover {
    background-color: #333;
  }

  .alert-close-btn img {
    max-width: 12px;
    max-height: 12px;
  }

  .redirect-buttons {
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
  }

  .redirect-buttons a, .redirect-buttons button {
    height: 32px;
    font-weight: unset;
  }

  .redirect-buttons a:hover::after, .redirect-buttons a::after {
    width: 0;
    transition: none;
  }

</style>