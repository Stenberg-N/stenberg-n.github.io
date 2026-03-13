<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { projects } from '$lib/projects';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { t } from '$lib/i18n';

  type ProjectSlug = 'finance-tracker' | 'focusboard' | 'waste-classifier';
  type ProjectRoute = `/projects/${ProjectSlug}`;

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');
  const { setCurrentPage } = getContext<{ setCurrentPage: (page: string) => void }>('currentPage');

  onMount(() => {
    setOnHomeScreen(true);
    setCurrentPage('/projects');
  });

</script>

<div id="projects">
  {#each projects as { id, title, slug, picture, descriptionKey, demo, tech, isWIP } (id)}
    <div role="link" tabindex="0" class="project anchor underline-el" style="background-image: url({picture});" onclick={() => goto(resolve(`/projects/${slug}` as ProjectRoute))} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto(resolve(`/projects/${slug}` as ProjectRoute))} }}>
      <div style="display: flex; flex-direction: row; position: relative; z-index: 1;">
        <p style="font-weight: 800; text-align: left;">{ title }</p>
        <div style="display: flex; flex: 1;"></div>
        <p style="font-weight: 800; text-align: right; color: {isWIP ? '#ff8500' : '#78ff78'};">{isWIP ? 'WIP' : 'Non-active | Done'}</p>
      </div>
      <div style="display: flex; flex-direction: column; flex: 1 1 0; gap: 20px; margin-top: 20px; position: relative; z-index: 1;">
          <p style="font-weight: normal;">{$t[descriptionKey]}</p>
          {#if id === 1}
            <a class="anchor underline-el" style="width: fit-content;" onclick={(e) => e.stopPropagation()} href="https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/">{$t[demo]}</a>
          {/if}
          <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px; max-width: 400px; max-height: 140px; margin-top: auto;">
            {#each tech as t (t)}
              <div class="technology-card">
                <p>{t}</p>
              </div>
            {/each}
          </div>
      </div>
    </div>
  {/each}
</div>

<style>
  #projects {
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 420px));
    grid-template-rows: repeat(auto-fill, 420px);
    justify-content: center;
    gap: 20px;
    padding: 1rem;
    user-select: none;
  }

  .project {
    display: flex;
    flex-direction: column;
    align-items: unset;
    min-width: 250px;
    max-width: 420px;
    width: 100%;
    height: 420px;
    border-radius: 12px;
    padding: 12px;
    padding-bottom: 24px;
    background-color: #777;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    outline: 1px solid transparent;
    perspective: 800px;
    transition: outline 0.2s, transform 0.2s, box-shadow 0.2s;
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
    outline-color: rgba(255, 70, 70, 1);
    transform: translateY(-12px) rotateX(-12deg) rotateY(-6deg) rotateZ(-0.5deg);
    box-shadow: 0 8px 24px rgba(255, 70, 70, 0.5);
    cursor: pointer;
  }

  .technology-card {
    align-content: center;
    height: 32px;
    background-color: rgba(255, 70, 70, 1);
    border-radius: 16px;
    padding: 2px 10px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }

  @media (max-width: 1200px) {
    #projects {
      grid-template-columns: repeat(1, minmax(250px, 420px));
    }
  }
</style>