<script lang="ts">
	import { getContext, onMount } from "svelte";

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<div id="main">
  Content
</div>

<style>
  #main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    align-items: center;
    justify-content: center;
    justify-self: center;
    height: 100%;
    width: 75%;
    margin-top: 210px;
    padding: 20px;
    background-color: #555;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }

  @media (max-width: 500px) {
    #main {
      width: calc(100% - 20px);
    }
  }
</style>