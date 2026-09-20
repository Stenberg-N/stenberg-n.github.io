<script lang="ts">
  import { fly } from 'svelte/transition';

  import { t } from '$lib/i18n/i18n';
	import type { Alert } from '$lib/types';
	import { closeAlert } from '$lib/alert';

  let {
    alert,
  }: {
    alert: Alert
  } = $props();

  let alertEl = $state<HTMLDivElement | null>(null);
  let timer: ReturnType<typeof setTimeout> | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;
  let isHovered = $state<boolean>(false);

  const duration = 3000;
  let remainingTime = $state<number>(duration);

  const startTimer = () => {
    const startTime = Date.now();

    timer = setTimeout(() => {
      closeAlert(alert.id);
    }, remainingTime);

    interval = setInterval(() => {
      const newRemaining = Math.max(0, remainingTime - (Date.now() - startTime));

      if (newRemaining <= 0) {
        remainingTime = 0;
        stopTimer();
      } else {
        remainingTime = newRemaining;
      }
    }, 10);
  };

  const stopTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  $effect(() => {
    if (alert.isTimer && !isHovered) startTimer();
    return () => stopTimer();
  });

  $effect(() => {
    if (!alert.isTimer || !alertEl) return;

    const width = `${100 - (((duration - remainingTime) / duration) * 100)}%`;
    alertEl.style.setProperty('--alert-progress-bar-width', width);
  });

</script>

<div bind:this={alertEl} role="alert" class="alert-container flex vertical" transition:fly={{ y: 100, duration: 400 }} onmouseenter={() => { isHovered = true; stopTimer(); }} onmouseleave={() => isHovered = false}>
  <button aria-label="Close alert" id="alert-close-btn" class="flex vertical button-primary transparent-highlight" onclick={() => closeAlert(alert.id)}>
    <span class="span-icon" style="mask-image: url('/assets/close-x.svg');"></span>
  </button>
  <div class="alert-content flex horizontal">
    <p class="alert-message">
      {$t[alert.message]}
    </p>
  </div>
  {#if alert.showButtons}
    <div class="redirect-buttons flex horizontal">
      <a class="button-primary anchor outline" href={alert.link} rel="external">
        {$t['button.confirm']}
      </a>
      <button class="button-primary outline" onclick={() => { alert.onCancel(); closeAlert(alert.id); }}>
        {$t['button.cancel']}
      </button>
    </div>
  {/if}
</div>

<style>
  .alert-container {
    position: relative;
    max-width: 360px;
    border-radius: 8px;
    padding: 12px;
    gap: 24px;
    background-color: var(--bg-color-primary2);
    overflow: hidden;
    outline: 1px solid var(--border-color-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: var(--color-white-primary);
      width: var(--alert-progress-bar-width);
    }
  }

  .alert-content {
    margin-right: 1.5rem;
  }

  .alert-message {
    margin: 0;
  }

  #alert-close-btn {
    position: fixed;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    align-self: center;
    border-radius: 50%;
    padding: 0;

    span {
      width: 10px;
      height: 10px;
    }
  }

  .redirect-buttons {
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--border-color-primary);
  }

</style>