<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { projects } from '$lib/projects';
  import { goto } from "$app/navigation";

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<h1 style="justify-self: center; filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8)); user-select: none;">All projects</h1>

<div id="projects">
  {#each projects as { id, title, slug, picture, description }}
    <div role="link" tabindex="0" class="project anchor" style="background-image: url({picture});" onclick={() => goto(`/projects/${slug}`)} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto(`/projects/${slug}`); }}}>
      <div style="margin-bottom: 16px; position: relative; z-index: 1;">
        <p style="filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8)); font-weight: 800;">{ title }</p>
      </div>
      <div style="display: flex; flex-direction: column; flex: 1 1 0; gap: 20px; margin-top: 20px; position: relative; z-index: 1;">
          <p style="margin: 0; font-weight: normal; filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8));">{description}</p>
          {#if id === 1}
            <a class="anchor" style="margin-top: auto; width: fit-content; filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8));" onclick={(e) => e.stopPropagation()} href="https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/">Web app's demo</a>
          {/if}
      </div>
    </div>
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
    justify-content: center;
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
    background-color: #777;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    perspective: 800px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .project::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1.5px);
    background-color: rgba(0,0,0,0.3);
    z-index: 0;
    box-shadow: 0 8px 24px rgba(0,0,0,1);
  }

  .project:hover {
    transform: translateY(-12px) rotateX(-12deg) rotateY(-6deg) rotateZ(-0.5deg);
    box-shadow: 0 8px 24px rgba(0,0,0,1);
    cursor: pointer;
  }
</style>