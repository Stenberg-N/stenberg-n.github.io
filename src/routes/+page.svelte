<script lang="ts">
	import { getContext, onMount } from "svelte";

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<h1 style="justify-self: center;">Home Page</h1>
