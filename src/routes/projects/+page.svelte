<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { projects } from '$lib/projects';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { t } from '$lib/i18n';

  type ProjectSlug = 'finance-tracker' | 'focusboard' | 'waste-classifier';
  type ProjectRoute = `/projects/${ProjectSlug}`;

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<div id="projects">
  {#each projects as { id, title, slug, picture, descriptionKey, demo, tech, isWIP } (id)}
    <div role="link" tabindex="0" class="project anchor" style="background-image: url({picture});" onclick={() => goto(resolve(`/projects/${slug}` as ProjectRoute))} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto(resolve(`/projects/${slug}` as ProjectRoute))} }}>
      <div style="display: flex; flex-direction: row; 16px; position: relative; z-index: 1;">
        <p style="font-weight: 800;">{ title }</p>
        <div style="display: flex; flex: 1;"></div>
        {#if isWIP}
          <p style="font-weight: 800; color: #ff8500">WIP</p>
        {/if}
      </div>
      <div style="display: flex; flex-direction: column; flex: 1 1 0; gap: 20px; margin-top: 20px; position: relative; z-index: 1;">
          <p style="font-weight: normal;">{$t[descriptionKey]}</p>
          <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px; max-width: 400px; max-height: 140px; margin-top: auto;">
            {#each tech as t (t)}
              <div class="technology-card">
                <p>{t}</p>
              </div>
            {/each}
          </div>
          {#if id === 1}
            <a class="anchor" style="width: fit-content; filter: drop-shadow(0 10px 12px rgba(0,0,0,0.8));" onclick={(e) => e.stopPropagation()} href="https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/">{$t[demo]}</a>
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
    padding: 40px;
    margin-top: 90px;
    user-select: none;
  }

  .project {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    max-width: calc(100% / 4);
    width: 100%;
    min-height: 250px;
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
    backdrop-filter: blur(1px);
    background-color: rgba(0,0,0,0.3);
    z-index: 0;
    box-shadow: 0 8px 24px rgba(0,0,0,1);
  }

  .project:hover {
    transform: translateY(-12px) rotateX(-12deg) rotateY(-6deg) rotateZ(-0.5deg);
    box-shadow: 0 8px 24px rgba(0,0,0,1);
    cursor: pointer;
  }

  .technology-card {
    align-content: center;
    height: 32px;
    background-color: hsl(4, 32%, 32%);
    border-radius: 16px;
    padding: 2px 10px;
    font-weight: normal;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }
</style>