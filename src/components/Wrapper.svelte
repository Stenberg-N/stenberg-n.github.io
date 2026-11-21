<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import { dragElement, handleClickOutside, isElDragged } from '#lib/actions.ts';
	import { viewport } from '#lib/viewport.ts';

	let {
		children,
		options
	}: {
		children: Snippet<[]>;
		options: {
			setZoomedElementImage: (state: null) => void;
			ignorableEls?: (HTMLElement | null)[];
		};
	} = $props();

	let wrapper = $state<HTMLDivElement | null>(null);
	let closeBtn = $state<HTMLButtonElement | null>(null);
	const vp = $derived(get(viewport));

	onMount(() => {
		if (!wrapper) return;

		const h = vp.width <= 750 ? '148px' : '100px';
		const w = `${vp.width / 2 - wrapper.clientWidth / 2}px`;

		wrapper.style.top = h;
		wrapper.style.left = w;
	});

	const applyProperty = (top: number, left: number) => {
		if (!wrapper) return;

    if (wrapper.style.top !== "0") {
      wrapper.style.top = "0";
      wrapper.style.left = "0";
    }

    wrapper.style.transform = `translate3d(${left}px, ${top}px, 0)`;
	};
</script>

<div
	class="wrapper-element-container flex vertical notched lighter"
	bind:this={wrapper}
	role="dialog"
	tabindex="0"
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			options.setZoomedElementImage(null);
		}
	}}
	use:handleClickOutside={{
		onOutsideClick: () => options.setZoomedElementImage(null),
		getIgnorableEls: () => options.ignorableEls ?? []
	}}
	transition:fade={{ duration: 200, easing: cubicInOut }}
>
	<div
		id="drag-handle"
		class="flex horizontal"
		class:dragged={$isElDragged}
		use:dragElement={{
			parentElement: wrapper,
			onMove: (top, left) => {
				applyProperty(top, left);
			},
			ignoreEl: closeBtn
		}}
	>
		<div id="filler"></div>
		<span class="span-icon img-small" style="mask-image: url('/assets/burger.svg');"></span>
		<button
			bind:this={closeBtn}
			aria-label="Close image"
			class="button-primary static notched light"
			onclick={(e) => {
				e.stopPropagation();
				options.setZoomedElementImage(null);
			}}
		>
			<span class="span-icon img-extra-small" style="mask-image: url('/assets/close-x.svg');"
			></span>
		</button>
	</div>
	<div class="divider"></div>
	{@render children()}
</div>

{#each [wrapper], i (i)}
	{onMount(() => wrapper?.focus())}
{/each}

<style>
	.wrapper-element-container {
		position: fixed;
		max-width: 90dvw;
		max-height: 88dvh;
		z-index: 10000;
		align-items: center;
		gap: 0;
    will-change: transform;

		&::after {
			box-shadow: none;
		}

		#filler {
			flex-shrink: 0;
			width: 32px;
			height: 32px;
		}

		#drag-handle {
			width: 100%;
			justify-content: space-between;
			padding: 6px 0.75rem 0.25rem;

			&.dragged {
				cursor: grabbing;
			}
		}
	}
</style>
