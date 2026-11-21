<script lang="ts">
	import { sendAlert } from '#lib/alert.js';
	import { t } from '#lib/i18n/i18n.ts';

	let { data } = $props();

	const title = $derived($t[`samples.${data.sample.slug}`] as string);
	const subtitle = $derived($t[`${data.sample.title}`] as string);

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(data.sample.sample);
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
</script>

<div id="code-sample-page" class="flex vertical">
	<h1>{title}</h1>
	<div class="marginalized">
		<div class="flex horizontal" style="gap: 2rem;">
			<button aria-label="Copy code" class="button-primary notched lighter" onclick={copyCode}>
				<span class="span-icon img-medium" style="mask-image: url('/assets/copy.svg');"></span>
			</button>
			<h2>{subtitle}</h2>
		</div>
		<pre><code>{data.sample.sample}</code></pre>
	</div>
</div>

<style>
	#code-sample-page {
		.marginalized {
			outline: 2px solid var(--border-color-primary);
			padding: 2rem;
		}

		button {
			height: 3rem;
			width: 3rem;
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
