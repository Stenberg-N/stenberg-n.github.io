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

<div id="projects">
  {#each projects as project (project.id)}
    <div role="link" tabindex="0" class="project horizontal-flex-box underline-el outline-highlight interactive-el"
      style="background-image: url({project.picture});"
      onclick={() => projects.some(p => p.id === project.id)
        ? (setSelectedProjectId(project.id), goto(resolve(`/projects/${project.slug}` as ProjectRoute)))
        : sendAlert({ message: "alert.project-not-found", isTimer: true, showButtons: false })
      }
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProjectId(project.id); goto(resolve(`/projects/${project.slug}` as ProjectRoute)); } }}
    >
      <div class="project-info-container vertical-flex-box">
        <div class="project-top-bar">
          <h1 style="margin: 0 0 4px 0;">{project.title}</h1>
          <div class="project-repo-container horizontal-flex-box">
            <img src="/assets/github-logo.svg" alt="GitHub" class="img-small" style="filter: brightness(0) invert(0.9);" />
            <button class="button-transparent underline-el" onclick={(e) => { e.stopPropagation(); sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: project.repo }); }}>
              {$t["projects.project.repository"]}
            </button>
          </div>
        </div>
        <p>{$t[project.descriptionKey]}</p>
        <p class="project-status" style="color: {project.isWIP ? '#ff8500' : '#78ff78'}">
          {project.isWIP ? $t["projects.project-status.wip"] : $t["projects.project-status.inactive"]}
        </p>
        <div class="project-bottom-container vertical-flex-box">
          {#if project.demo.trim().length > 0}
            <button class="demo-button button-transparent underline-el outline-highlight"
              onclick={(e) => { e.stopPropagation(); sendAlert({ message: "alert.message.demo", isTimer: false, showButtons: true, link: project.demolink }); }}>
              {$t[project.demo]}
            </button>
          {/if}
          <div class="tech-card-container horizontal-flex-box">
            {#each project.tech as tech, i (i)}
              <span class="tech-card">{tech}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  #projects {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    padding: 4rem;
    gap: 48px;
    user-select: none;

    .project {
      justify-content: flex-start;
      width: 100%;
      padding: 32px;
      border-radius: 4px;
      background-repeat: no-repeat;
      background-size: cover;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        backdrop-filter: blur(1px);
        background: rgba(0, 0, 0, 0.25);
      }
      &::after {
        transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
      }

      .project-repo-container {
        justify-content: flex-start;
        gap: 8px;
        padding-left: 1rem;

        button {
          font-size: clamp(0.75rem, 0.85cqw, 14px);
        }
      }
    }

    .project-info-container {
      height: 100%;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 32px;
      font-size: clamp(0.875rem, 1.08cqw, 1.125rem);

      h1, p, button {
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        padding: 4px 8px;
      }

      h1, p {
        overflow-wrap: break-word;
        hyphens: auto;
      }

      p { max-width: 60%; }

      .project-status {
        font-weight: bold;
      }
    }

    .project-bottom-container {
      align-items: flex-start;
      gap: 1rem;
      margin-top: auto;

      .demo-button {
        padding: 12px;
        border-radius: 8px;
        background-color: #333;
        outline: none;

        &:hover {
          background-color: rgb(255, 70, 70);
        }
      }
    }

    .tech-card-container {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 8px;

      .tech-card {
        padding: 6px 12px;
        background-color: rgb(255, 70, 70);
        border-radius: 9999px;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 1200px) {
    #projects, #projects .project { padding: 1rem; }
    #projects .project {
      flex-direction: column;
    }

    #projects .project-info-container p {
      max-width: unset;
    }

    #projects .project .project-info-container {
      height: 100%;
    }
  }
</style>