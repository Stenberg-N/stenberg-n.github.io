<script lang="ts">
  import { resolve } from "$app/paths";

	import { handleHorizontalScroll } from "$lib/actions";
	import { sendAlert } from "$lib/alert";
  import { t } from "$lib/i18n/i18n";
  import { skills } from "$lib/skills";
  import { projects } from "$lib/projects";
	import { viewport } from "$lib/viewport";

	import ZoomElementContent from "../components/ZoomElementContent.svelte";
	import Wrapper from "../components/Wrapper.svelte";

  const currentProject = projects.find((p) => p.isCurrent === true) ?? null;
  let zoomedElementImage = $state<string | null>(null);
  let badgeRefs = $state<HTMLElement[]>([]);
  let projectImgRefs = $state<HTMLElement[]>([]);

  let timeout: ReturnType<typeof setTimeout>;
  let isHovered = $state<boolean>(false);

  const currentProjectImages = $derived.by(() => {
    if (!currentProject) return;

    const imageTexts = currentProject?.imageTextsKey ? ($t[currentProject.imageTextsKey] as string[] | undefined) : undefined;
    const highlightImages = currentProject?.highlightImages;
    if (!imageTexts || !highlightImages) return;

    return imageTexts.map((text, i) => [text, highlightImages[i]]);
  });
  const introContacts = [
    {
      img: "/assets/github-logo.svg",
      text: "GitHub",
      command: () => sendAlert({ message: "alert.message.github", isTimer: false, showButtons: true, link: "https://github.com/Stenberg-N" }),
    },
    {
      img: "/assets/linkedin-logo.svg",
      text: "LinkedIn",
      command: () => sendAlert({ message: "alert.message.linkedin", isTimer: false, showButtons: true, link: "https://www.linkedin.com/in/niko-stenberg-543982408/" }),
    },
    {
      img: "/assets/email-logo.svg",
      text: "stenbergniko@outlook.com",
      command: null,
    },
    {
      img: "/assets/location-pin.svg",
      get text() { return $t["contact-location"]; },
      command: null,
    },
  ];
  const cyberSecSkillButtons = [
    {
      get text() { return $t["home.cybersec.description"][2]; },
      command: () => sendAlert({ message: "alert.message.jamk", isTimer: false, showButtons: true, link: "https://cs4e.pages.labranet.jamk.fi/ooc/20-Background/" })
    },
    {
      get text() { return ($t["home.cybersec.description"][1] as string).split(":")[0]; },
      command: () => sendAlert({ message: "alert.message.dnv", isTimer: false, showButtons: true, link: "https://cyberchallenge.dnv.com/h/forensics/" })
    },
  ];

  $effect(() => {
    return () => clearTimeout(timeout);
  });

  const handleTwitchRight = () => {
    if (isHovered) return;

    isHovered = true;
    timeout = setTimeout(() => {
      isHovered = false;
    }, 400);
  };
</script>

<div id="home-container" class="flex vertical">
  {#if zoomedElementImage}
    <Wrapper options={{ setZoomedElementImage: (state) => { zoomedElementImage = state; }, ignorableEls: [...badgeRefs, ...projectImgRefs] }}>
      <ZoomElementContent options={{ zoomedElementImage }} />
    </Wrapper>
  {/if}

  <div id="intro-wrapper">
    <section id="intro" class="marginalized">
      <div id="intro-texts">
        {#each $t["intro-titles"] as title (title)}
          <h2>{title}</h2>
        {/each}
        <div class="divider"></div>
        <p>{$t["intro-paragraph"]}</p>
        <div id="intro-contacts" class="text-container">
          {#each introContacts as el, i (i)}
            <div class="flex horizontal">
              <span class="span-icon img-medium" style="mask-image: url('{el.img}'); {i === 1 && 'background-color: #0e76a8;'}"></span>
              {#if [0, 1].includes(i)}
                <button class="button-primary text-only" onclick={el.command}>
                  {el.text}
                </button>
              {:else}
                <p>{el.text}</p>
              {/if}
            </div>
          {/each}
        </div>
        <a class="button-primary anchor white-bg rounder-corners" href={resolve("/projects")} onmouseenter={handleTwitchRight}>
          {$t["home.view-projects"]}
          <span class="span-icon img-small-medium" style="mask-image: url('/assets/arrow.svg');" class:is-moved={isHovered}></span>
        </a>
        {#if $viewport.width <= 750}
          <div class="divider"></div>
        {/if}
      </div>
      <div class="img-wrapper">
        <img src="/images/selfie.jpg" alt="Selfie" />
      </div>
    </section>
  </div>

  <div id="skills-wrapper">
    <h1>
      {$t["home.knowledge.title"]}
    </h1>
    <div id="skills-container" class="flex vertical marginalized">
      <div id="scroll-row" class="flex horizontal" use:handleHorizontalScroll>
        {#each skills as { title, items, badges }, i (i)}
          <div class="skill flex vertical">
            <p>{$t[title]}</p>
            <ul>
              {#each $t[items] as item (item)}
                <li>{item}</li>
              {/each}
            </ul>
            {#if i === 2}
              {#each cyberSecSkillButtons as btn, i (i)}
                <button class="button-primary text-only red-text" onclick={btn.command}>
                  {btn.text}
                </button>
              {/each}
            {/if}
            <div class="badge-container" use:handleHorizontalScroll>
              {#each badges as badge, i (badge)}
                <div bind:this={badgeRefs[i]} role="button" tabindex="0" class="img-wrapper" onclick={() => zoomedElementImage = badge} onkeydown={(e) => { if (e.key === 'Enter') zoomedElementImage = badge}}>
                  <img src="{badge}" alt="{badge}+{i}" />
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div id="current-project-wrapper">
    <h1>
      {$t["home.working-on.title"]}
    </h1>
    <div id="current-project-container" class="flex vertical marginalized">
      {#if !currentProject}
        <p>{$t["home.paragraph.no-current-message"]}</p>
      {:else}
        <p>{$t[currentProject.descriptionKey]}</p>
        <a class="button-primary anchor white-bg rounder-corners" href={resolve(`/projects/${currentProject.slug}`)}>
          {$t["home.view-current-project"]}
        </a>
        <div id="project-images-container" class="flex vertical">
          {#each currentProjectImages as el, i (i)}
            <div class="project-img flex vertical">
              <p><span>{el[0].split(".")[0]}<br/></span>{el[0].split(".")[1]}.</p>
              <div
                bind:this={projectImgRefs[i]}
                role="button"
                tabindex="0"
                class="img-wrapper"
                onclick={() => zoomedElementImage = el[1]}
                onkeydown={(e) => { if (e.key === 'Enter') zoomedElementImage = el[1]; }}
              >
                <img src={el[1]} alt={el[1].split("/")[2]} />
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  #home-container {
    gap: 0;

    > div:not(.zoomed-element-container) {
      padding: 0 2rem;
      border-bottom: 1px solid var(--border-color-primary);

      > h1 {
        text-align: center;
        margin: 8rem 0 0;
      }
    }

    #intro {
      display: grid;
      grid-template-columns: 1fr 0.8fr;
      gap: 6rem;

      h2 {
        margin: 0;
        font-size: 4rem;

        &:first-of-type, &:last-of-type {
          font-size: 2rem;
        }
      }

      #intro-texts {

        > a {
          width: fit-content;
          padding: 0.75rem;
          font-size: inherit;

          .is-moved {
            animation: twitch-right 400ms ease-in-out;
          }

          span {
            transform: rotate(-90deg);
          }
        }

        > p {
          margin: 0;
        }
      }
    }

    #intro-contacts {
      gap: 1.5rem;
      margin: 2rem 0;

      > div {
        gap: 1rem;
        align-items: stretch;

        p {
          margin: 0;
          word-break: break-word;
        }

        button {
          font-size: inherit;
        }
      }
    }

    #skills-container {

      #scroll-row {
        justify-content: flex-start;
        overflow-x: auto;
        gap: 1.5rem;
        padding: 1rem 1.5rem;
        mask-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 2%, rgb(0, 0, 0) 98%, rgba(0, 0, 0, 0));

        &::-webkit-scrollbar, ::-webkit-scrollbar {
          background-color: transparent;
        }

        &::-webkit-scrollbar-track {
          margin: 0 1.5rem;
        }

        &::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        &:hover::-webkit-scrollbar, :hover::-webkit-scrollbar {
          background-color: var(--bg-color-primary2);
        }

        &:hover::-webkit-scrollbar-thumb, :hover::-webkit-scrollbar-thumb {
          background-color: #888;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-white-primary);
        }
      }

      .skill {
        flex-shrink: 0;
        align-self: stretch;
        justify-content: flex-start;
        width: calc((100% - 1.5rem) / 2);
        gap: 1rem;
        padding: 1.5rem;
        border-radius: 1rem;
        outline: 1px solid var(--border-color-primary);
        transition: outline-color, background-color 100ms ease-in-out;

        &:hover {
          background-color: var(--bg-color-primary1-hover);
          outline-color: var(--border-color-primary-highlight);
        }

        button {
          align-self: flex-start;
          padding-left: 1rem;
          font-size: inherit;
          transition: transform, color 100ms ease-in-out;

          &:hover {
            transform: scale(1.02);
          }
        }

        ul {
          list-style-type: square;
          padding-inline-start: 2rem;
          
          li {
            margin: 1rem 0;
            font-size: 1.125rem;
          }
        }

        p {
          margin: 0;
        }

        > p {
          font-weight: bold;
          font-size: 1.25rem;
        }
      }

      .badge-container {
        display: grid;
        grid-auto-columns: 6.5rem;
        grid-auto-flow: column;
        gap: 1rem;
        padding: 0.5rem;
        overflow-x: auto;
        mask-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgb(0, 0, 0) 2%, rgb(0, 0, 0) 98%, rgba(0, 0, 0, 0));

        &::-webkit-scrollbar-track {
          margin: 0 0.5rem;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-white-primary);
        }

        .img-wrapper {
          padding: 4px;
          background-color: var(--bg-color-secondary2);
          border-radius: 12px;
          transition: background-color 100ms ease-in-out;
          
          &:hover {
            background-color: var(--bg-color-secondary3);
            cursor: pointer;
          }
        }

        img {
          border-radius: 0.5rem;
          width: 6rem;
          height: 6rem;
        }
      }
    }

    #current-project-container {
      align-items: center;

      > p {
        text-align: center;
      }

      > a {
        padding: 0.75rem;
        font-size: inherit;
      }

      #project-images-container {
        margin-top: 8rem;
        gap: 1.5rem;
      }

      .project-img {
        position: relative;
        padding: 3rem;
        border-radius: 1rem;
        background-image: var(--bg-image-linear-gradient1);

        &::before {
          content: '';
          position: absolute;
          inset: -4px;
          z-index: -1;
          background-color: var(--bg-color-primary2);
          border-radius: 1rem;
          outline: 1px solid var(--border-color-primary);
        }

        > p {
          margin: 0 0 1rem;

          span {
            font-weight: bold;
            font-size: 1.25rem;
          }
        }

        > .img-wrapper {
          outline: 1px solid var(--border-color-primary);
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
          transition: outline-color 100ms ease-in-out;

          &:hover {
            outline-color: var(--border-color-primary-highlight);
            cursor: pointer;
          }
        }
      }
    }
  }

  @keyframes twitch-right {
    0% {
      transform: translateX(0) rotate(-90deg);
    }
    50% {
      transform: translateX(4px) rotate(-90deg);
    }
    100% {
      transform: translateX(0) rotate(-90deg);
    }
  }

  @media (max-width: 750px) {
    #home-container {

      > div {
        padding: 0 2rem;
      }

      #intro {
        grid-template-columns: minmax(0, 1fr);
        gap: 0;

        h2 {
          font-size: 2.5rem;

          &:first-of-type, &:last-of-type {
            font-size: 1.5rem;
          }
        }

        > .img-wrapper {
          justify-self: center;
        }
      }

      #skills-container {

        #scroll-row {
          flex-direction: column;
          padding: 1rem 0.5rem;

          .skill {
            width: 100%;
            padding: 1rem;
            font-size: clamp(0.875rem, 2.25cqw, 1rem);

            ul {
              padding-inline-start: 1.5rem;
            }

            li {
              font-size: clamp(0.875rem, 2.25cqw, 1rem);
            }
          }
        }
      }

      #current-project-container {

        #project-images-container {
          gap: 3rem;
        }

        .project-img {
          padding: 1rem;
        }
      }
    }
  }
</style>