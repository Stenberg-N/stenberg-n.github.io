<script lang="ts">
  import { projects } from '$lib/projects';
  import { t } from '$lib/i18n';
	import { sendAlert } from "$lib/alert";
	import ProjectPage from '../../components/ProjectPage.svelte';
	import { getContext } from 'svelte';

  const selectedProject = getContext<{ getSelectedProjectId: () => number | null, setSelectedProjectId: (id: number | null) => void }>('selectedProject');
  const setSelectedProjectId = (id: number | null) => selectedProject.setSelectedProjectId(id);
  let selectedProjectId = $derived(selectedProject.getSelectedProjectId());

</script>

{#if selectedProjectId !== null}
  <ProjectPage projectId={selectedProjectId} isSecondIntroPic={selectedProjectId === 2 ? false : true} />
{/if}

{#if selectedProjectId === null}
  <div id="projects">
    {#each projects as { id, title, picture, descriptionKey, demo, demolink, tech, isWIP } (id)}
      <div role="link" tabindex="0" class="project anchor underline-el" style="background-image: url({picture}); padding-bottom: 24px;" onclick={() => setSelectedProjectId(id)} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProjectId(id); } }}>
        <div style="display: flex; flex-direction: row; position: relative; z-index: 1;">
          <p style="font-weight: 800; text-align: left;">{ title }</p>
          <div style="display: flex; flex: 1;"></div>
          <p style="font-weight: 800; text-align: right; color: {isWIP ? '#ff8500' : '#78ff78'};">{isWIP ? 'WIP' : 'Non-active | Done'}</p>
        </div>
        <div style="display: flex; flex-direction: column; flex: 1 1 0; gap: 20px; margin-top: 20px; position: relative; z-index: 1;">
          <p style="font-weight: normal;">{$t[descriptionKey]}</p>
          {#if id === 1}
            <button class="demo-button hover-highlight underline-el" onclick={(e) => { e.stopPropagation(); sendAlert("alert.message.demo", false, true, demolink); }}>{$t[demo]}</button>
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
{/if}

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
    background-color: #333;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
    outline: 1px solid transparent;
    transition: outline 0.2s, transform 0.2s, box-shadow 0.2s, background-color 0.2s;
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
    transform: translateY(-4px);
    background-color: #555;
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

  .demo-button {
    align-self: flex-start;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #0f0f0f;
    font-weight: 800;
    color: #f6f6f6;
  }

  .demo-button:hover {
    background-color: rgba(255, 70, 70, 1);
  }

  @media (max-width: 1200px) {
    #projects {
      grid-template-columns: repeat(1, minmax(250px, 420px));
    }
  }
</style>