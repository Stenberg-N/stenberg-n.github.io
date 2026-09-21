<script lang="ts">
	import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
	import { sendAlert } from "$lib/alert";

  import { t } from "$lib/i18n/i18n";
  import { projects } from "$lib/projects";

  type ProjectSlug = "fin-radar" | "finance-tracker" | "focusboard" | "waste-classifer";

</script>

<div id="projects-container" class="flex vertical">
  <h1>{$t["navigation.anchors.names"][1]}</h1>
  <div id="projects-wrapper" class="marginalized">
    {#each projects as project, i (i)}
      <div
        role="button"
        tabindex="0"
        class="project-container flex vertical"
        onclick={() => goto(resolve(`/projects/${project.slug as ProjectSlug}`))}
        onkeydown={(e) => { if (e.key === 'Enter') goto(resolve(`/projects/${project.slug as ProjectSlug}`)); }}
      >
        <div class="img-wrapper">
          <img src={project.coverImage} alt={project.coverImage.split("/")[2]} />
        </div>
        <div class="divider"></div>
        <div id="content" class="flex vertical">
          <h2>{project.title}</h2>
          <button class="button-primary anchor text-only red-text" onclick={(e) => { e.stopPropagation(); sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: project.repo }); }}>
            <span class="span-icon img-small" style="mask-image: url('/assets/github-logo.svg');"></span>
            {$t["projects.project.repository"]}
          </button>
          <p>{$t[project.descriptionKey]}</p>
          <div id="techs-used" class="flex horizontal">
            {#each project.techUsed as tech (tech)}
              <div>
                <p>{tech}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  #projects-container {
    gap: 0;

    &::before {
      content: '';
      position: fixed;
      inset: 0 8px 0 0;
      z-index: -1;
      background: radial-gradient(ellipse at 50% 60%, #111 6%, #0c0c0c 24%, #080808 50%, black 72%);
    }

    > h1 {
      text-align: center;
      margin: 8rem 0 0;
    }

    #projects-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 550px;
      gap: 2rem;
      padding: 0 2rem;

      .project-container {
        justify-content: flex-start;
        width: 100%;
        border-radius: 1rem;
        background-color: var(--bg-color-secondary1);
        outline: 1px solid var(--border-color-primary);
        overflow: hidden;
        transition: outline-color 100ms ease-in-out;

        &:hover {
          outline-color: var(--border-color-primary-highlight);
          cursor: pointer;
        }

        #content {
          align-items: flex-start;
          justify-content: flex-start;
          flex: 1 1 auto;
          padding: 1rem;
          gap: 0;

          h2 {
            margin: 0;
          }

          p {
            margin: 2rem 0;
          }
        }

        button {
          gap: 0.5rem;
        }

        .img-wrapper {
          width: 100%;
        }

        .divider {
          margin: 0;
        }

        #techs-used {
          flex-wrap: wrap;
          margin-top: auto;

          div {
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            background-color: var(--bg-color-secondary2);
            outline: 1px solid var(--border-color-primary);
          }

          p {
            margin: 0;
          }
        }
      }
    }
  }

  @media (max-width: 880px) {
    #projects-container {

      #projects-wrapper {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
  }
</style>