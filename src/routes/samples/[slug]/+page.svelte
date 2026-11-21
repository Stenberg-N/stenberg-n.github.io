<script lang="ts">
	import { sendAlert } from '#lib/alert.ts';
	import { t } from '#lib/i18n/i18n.ts';

	let { data } = $props();

	const title = $derived($t[`samples.${data.sample.slug}`] as string);
  let codeSampleRefs = $state<(HTMLElement | null)[]>([]);

	const copyCode = async (idx: number) => {
		try {
			await navigator.clipboard.writeText(data.sample.samples[idx].code);
			sendAlert({
				message: 'alert.code-sample.success',
				isTimer: true,
				showButtons: false
			});
		} catch {
			sendAlert({
				message: 'alert.code-sample.fail',
				isTimer: true,
				showButtons: false
			});
		}
	};

  const moveTo = (idx: number) => {
    codeSampleRefs[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
</script>

<div id="code-sample-page" class="flex vertical">
	<h1>{title}</h1>
  <div class="flex horizontal marginalized">
    <div id="code-samples-sidebar" class="flex vertical">
      {#each data.sample.samples as sample, i (sample.title)}
        <button class="button-primary text-only" onclick={() => moveTo(i)}>
          {$t[sample.title] as string}
        </button>
      {/each}
    </div>
    <div id="code-samples" class="flex vertical">
      {#each data.sample.samples as sample, i (sample.title)}
        <div>
          <div class="flex horizontal" style="gap: 2rem;">
            <button aria-label="Copy code" class="button-primary notched lighter" onclick={() => copyCode(i)}>
              <span class="span-icon img-medium" style="mask-image: url('/assets/copy.svg');"></span>
            </button>
            <h2 bind:this={codeSampleRefs[i]}>{$t[sample.title] as string}</h2>
          </div>
          <pre><code>{sample.code}</code></pre>
        </div>
        {#if i !== data.sample.samples.length - 1}
          <div class="divider"></div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
	#code-sample-page {
		.marginalized {
      gap: 1rem;

      > div {
        outline: 2px solid var(--border-color-primary);
      }
		}

    #code-samples-sidebar {
      position: sticky;
      align-self: flex-start;
      top: calc(var(--nav-height) + 4rem);
      justify-content: flex-start;
      width: 200px;
      padding: 1rem;

      button {
        justify-content: flex-start;
      }
    }

    #code-samples {
      min-width: 0;
      flex: 1;
      padding: 2rem;

      button {
        height: 3rem;
        width: 3rem;
      }
    }

		h2 {
			margin: 0;
		}

		h1 {
			text-align: center;
			margin: 8rem 0 0;
		}

		pre {
			padding: 2rem;
			background-color: var(--bg-color-primary2);
      overflow-x: auto;
		}

		code {
			font-family:
				monospace,
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				'Open Sans',
				'Helvetica Neue',
				sans-serif;
			white-space: pre;
		}
	}
</style>
