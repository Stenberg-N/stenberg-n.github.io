<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";

	import type { Project } from "$lib/types";
  import { t } from "$lib/i18n/i18n";
  import { sendAlert } from "$lib/alert";
  import { handleClickOutside } from "$lib/actions";

  import ZoomElementContent from "./ZoomElementContent.svelte";
	import { viewport } from "$lib/viewport";

  let {
    options,
  }: {
    options: {
      project: Project;
    }
  } = $props();

  const project = $derived(options.project);
  let zoomedElement = $state<HTMLDivElement | null>(null);
  let zoomedElementImage = $state<string | null>(null);
  let projectImgRefs = $state<HTMLElement[]>([]);
  const imageColumns = $derived.by(() => {
    const size = Math.ceil(project.allImages.length / 3);
    return Array.from({ length: 3}, (_, i) => project.allImages.slice(i * size, (i + 1) * size));
  });
</script>

<div id="project-page-container" class="flex vertical">
  {#if zoomedElementImage}
    <div
      bind:this={zoomedElement}
      class="zoomed-element-container flex vertical"
      role="dialog"
      tabindex="0"
      onkeydown={(e) => { if (e.key === 'Escape') { e.preventDefault(); zoomedElementImage = null; } }}
      use:handleClickOutside={{ onOutsideClick: () => zoomedElementImage = null, additionalIgnorableElements: projectImgRefs }}
      transition:fade={{ duration: 200, easing: cubicInOut }}
    >
      <ZoomElementContent
        options={{
          zoomedElement,
          zoomedElementImage,
          setZoomedElementImage: (state) => { zoomedElementImage = state },
        }}
      />
    </div>

    {#each [zoomedElement], i (i)}
      {onMount(() => zoomedElement?.focus())}
    {/each}
  {/if}

  <div id="project-intro" class="flex vertical marginalized">
    <div id="project-title-container">
      <h1>{project.title}</h1>
      <div id="project-hyperlinks" class="flex horizontal">
        <button class="button-primary anchor text-only red-text" onclick={(e) => { e.stopPropagation(); sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: project.repo }); }}>
          <span class="span-icon img-small-medium" style="mask-image: url('/assets/github-logo.svg');"></span>
          {$t["projects.project.repository"]}
        </button>
        {#if project.demoLink}
          <button class="button-primary outline" onclick={() => sendAlert({ message: "alert.message.demo", isTimer: false, showButtons: true, link: project.demoLink })}>
            {$t["projects.project.demo.web"]}
          </button>
        {/if}
      </div>
    </div>
    <div id="intro-text-images-container">
      <div class="text-container">
        {#each $t[project.paragraphKey] as text, i (i)}
          <p>{text}</p>
        {/each}
        <ul>
          {#each $t[project.featuresKey] as text, i (i)}
            <li>{text}</li>
          {/each}
        </ul>
      </div>
      <div id="project-intro-images-container" class="flex vertical">
        {#each project.introImages as img, i (img)}
          <div bind:this={projectImgRefs[projectImgRefs.length + (i+1)]} class="img-wrapper" role="button" tabindex="0" onclick={() => zoomedElementImage = img} onkeydown={(e) => { if (e.key === 'Enter') { zoomedElementImage = img }}}>
            <img src={img} alt={img.split("/")[2]} />
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div id="project-images-wrapper">
    <h1>{$t["projects.project.imagetitle"]}</h1>
    <div id="project-images" class="flex horizontal marginalized">
      {#if $viewport.width <= 980}
        {#each project.allImages as img, i (i)}
          <div bind:this={projectImgRefs[i]} class="img-wrapper" role="button" tabindex="0" onclick={() => zoomedElementImage = img} onkeydown={(e) => { if (e.key === 'Enter') { zoomedElementImage = img }}}>
            <img src={img} alt={img.split("/")[2]} />
          </div>
        {/each}
      {:else}
        {#each imageColumns as column, i (i)}
          <div class="project-image-column flex vertical">
            {#each column as img, i (i)}
              <div bind:this={projectImgRefs[i]} class="img-wrapper" role="button" tabindex="0" onclick={() => zoomedElementImage = img} onkeydown={(e) => { if (e.key === 'Enter') { zoomedElementImage = img }}}>
                <img src={img} alt={img.split("/")[2]} />
              </div>
            {/each}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  #project-page-container {

    .divider {
      margin: 0;
    }

    > div:not(.divider) {
      padding: 0 2rem;
    }

    .zoomed-element-container {
      top: var(--home-zoomed-element-container-top, 148px);
      left: var(--home-zoomed-element-container-left, 16px);
    }

    .img-wrapper {
      padding: 0.5rem;
      border-radius: 1rem;
      outline: 1px solid var(--border-color-primary);
      transition: outline-color 100ms ease-in-out;

      &:hover {
        cursor: pointer;
        outline-color: var(--border-color-primary-highlight);
      }

      img {
        border-radius: 12px;
      }
    }
    
    #project-intro {
      gap: 4rem;
      
      h1 {
        margin: 0;
      }

      #project-hyperlinks {
        gap: 2rem;

        > button:first-of-type {
          gap: 0.5rem;
        }
      }

      #intro-text-images-container {
        display: grid;
        grid-template-columns: 0.9fr 1fr;
        gap: 2rem;

        .text-container {
          height: fit-content;
          
          > p:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      #project-intro-images-container {
        justify-content: flex-start;
        gap: 2rem;
      }

      ul {
        list-style-type: square;
        padding-inline-start: 2rem;
        margin: 0;
        
        li {
          margin: 1rem 0;
        }
      }
    }

    #project-images-wrapper {

      h1 {
        text-align: center;
        margin: 8rem 0 0;
      }

      #project-images {
        align-items: flex-start;
        gap: 1rem;

        .project-image-column {
          width: calc(33% - 1rem);
          gap: 1rem;
        }
      }
    }
  }

  @media (max-width: 980px) {
    #project-page-container {

      > div:not(.divider) {
        padding: 0 1rem;
      }

      #project-intro {
        #intro-text-images-container {
          grid-template-columns: 1fr;

          > div {
            width: 100%;
          }
        }
      }

      #project-images-wrapper {
        #project-images {
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }

  @media (max-width: 420px) {
    #project-page-container {

      #project-intro {
        #project-title-container {
          h1 {
            text-align: center;
          }

          #project-hyperlinks {
            gap: 1rem;
            flex-direction: column;
          }
        }
      }
    }
  }
</style>