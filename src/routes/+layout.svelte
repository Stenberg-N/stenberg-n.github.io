<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav style="background-color: rgba(15,15,15,0.8); padding: 1rem;">
  <a href="/">Home</a>
  <a href="/projects">Projects</a>
</nav>

{@render children()}
