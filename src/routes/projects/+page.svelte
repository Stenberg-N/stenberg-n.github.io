<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { projects } from '$lib/projects';

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<h1 style="justify-self: center; filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8)); user-select: none;">All projects</h1>

<div id="projects">
  {#each projects as { title, slug, picture }}
    <a class="project anchor" href="/projects/{slug}">
      <div style="margin-bottom: 16px;">
        <p style="filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8));">{ title }</p>
      </div>
      <img src={picture} alt="{title} screenshot">
    </a>
  {/each}
</div>

<style>
  .anchor::after{
    background-color: #ae060f;
  }

  .anchor {
    overflow: hidden;
  }

  #projects {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 1 400px;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 40px;
    user-select: none;
  }

  .project {
    display: flex;
    flex-direction: column;
    max-width: calc(100% / 4);
    width: 100%;
    height: 400px;
    border-radius: 12px;
    padding: 12px;
    padding-bottom: 24px;
    background-image: linear-gradient(0deg, #222, #333);
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    perspective: 800px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .project img {
    display: flex;
    flex: 1 1 0;
    align-self: flex-end;
    margin-top: auto;
    max-width: 420px;
    width: 100%;
    max-height: 280px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }

  .project:hover {
    transform: translateY(-12px) rotateX(-8deg) rotateY(-6deg) rotateZ(-0.5deg);
    box-shadow: 0 8px 24px rgba(0,0,0,1);
  }
</style>