<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';

  import { projects } from '$lib/projects';
  import { t } from '$lib/i18n';
	import { sendAlert } from "$lib/alert";

  type ProjectSlug = "finance-tracker" | "focusboard" | "waste-classifier" | "fin-radar";
  type ProjectRoute = `/projects/${ProjectSlug}`;

  onMount(() => {
    setSelectedProjectId(null);
  });

  /**********************************************************************************************************************\
  |
  | Context, Helper & Wrapper functions
  |
  \**********************************************************************************************************************/
  const selectedProject = getContext<{ getSelectedProjectId: () => number | null, setSelectedProjectId: (id: number | null) => void }>('selectedProject');
  const setSelectedProjectId = (id: number | null) => selectedProject.setSelectedProjectId(id);

  /**********************************************************************************************************************/

</script>

<div id="projects" class="vertical-flex-box">
  {#each projects as project (project.id)}
    <div role="link" tabindex="0" class="project horizontal-flex-box underline-el hover-highlight interactive-el"
      onclick={() => projects.some(p => p.id === project.id) ? (setSelectedProjectId(project.id), goto(resolve(`/projects/${project.slug}` as ProjectRoute))) : sendAlert("alert.project-not-found", true, false)}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProjectId(project.id); goto(resolve(`/projects/${project.slug}` as ProjectRoute)); } }}
    >
      <div class="project-info-container vertical-flex-box">
        <h1 style="margin: 0 0 4px 0;">{project.title}</h1>
        <div class="project-repo-container horizontal-flex-box">
          <img src="/assets/github-logo.svg" alt="GitHub" class="img-small" style="filter: brightness(0) invert(0.9);" />
          <button class="transparent-button-bold underline-el" onclick={(e) => { e.stopPropagation(); sendAlert("alert.message.github", false, true, project.repo); }}>{$t["projects.project.repository"]}</button>
        </div>
        <p>{$t[project.descriptionKey]}</p>
        <p class="project-status" style="color: {project.isWIP ? '#ff8500' : '#78ff78'}">
          {project.isWIP ? $t["projects.project-status.wip"] : $t["projects.project-status.inactive"]}
        </p>
        <div class="project-bottom-container vertical-flex-box">
          {#if project.demo.trim().length > 0}
            <button class="demo-button transparent-button-bold underline-el hover-highlight" onclick={(e) => { e.stopPropagation(); sendAlert("alert.message.demo", false, true, project.demolink); }}>{$t[project.demo]}</button>
          {/if}
          <div class="tech-card-container horizontal-flex-box">
            {#each project.tech as tech, i (i)}
              <span class="tech-card">{tech}</span>
            {/each}
          </div>
        </div>
      </div>
      <div class="image-wrapper">
        <img src={project.picture} alt={`${project.title} image`} />
      </div>
    </div>
  {/each}
</div>

<style>
  #projects {
    justify-content: flex-start;
    padding: 4rem;
    gap: 48px;
    user-select: none;
  }

  #projects .project {
    width: 100%;
    height: 480px;
    gap: 24px;
    padding: 24px;
    border-radius: 4px;
  }

  #projects .project .image-wrapper {
    justify-content: flex-end;
    padding: 10px;
  }

  #projects .project .image-wrapper img {
    outline: 1px solid rgba(119, 119, 119, 0.4);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }

  #projects .project-info-container {
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: clamp(0.875rem, 1.08cqw, 1.125rem);
  }

  #projects .project .project-repo-container {
    justify-content: flex-start;
    gap: 8px;
    padding-left: 1rem;
    margin-bottom: 2rem;
  }

  #projects .project-info-container .project-status {
    margin-top: 1rem;
    font-weight: bold;
  }

  #projects .project-bottom-container {
    align-items: flex-start;
    gap: 1rem;
    margin-top: auto;
  }

  #projects .project-bottom-container .demo-button {
    padding: 12px;
    border-radius: 8px;
  }

  #projects .tech-card-container {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 8px;
  }

  #projects .tech-card-container .tech-card {
    padding: 6px 12px;
    background-color: rgb(255, 70, 70);
    border-radius: 9999px;
    font-weight: bold;
  }

  @media (max-width: 1200px) {
    #projects .project {
      flex-direction: column;
      height: 560px;
    }

    #projects .project .project-info-container {
      height: unset;
    }

    #projects .project .image-wrapper {
      justify-content: center;
    }

    #projects .project-bottom-container {
      margin-top: 24px;
    }
  }
</style>