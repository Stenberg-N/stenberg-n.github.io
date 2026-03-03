<script lang="ts">
  import { getContext, onMount } from "svelte";

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(false);
  });

</script>

<h1>Finance Tracker</h1>