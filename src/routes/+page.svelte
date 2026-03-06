<script lang="ts">
	import { getContext, onMount } from "svelte";
  import { t } from '$lib/i18n';

  const { setOnHomeScreen } = getContext<{ getOnHomeScreen: () => boolean, setOnHomeScreen: (state: boolean) => void }>('onHomeScreen');

  onMount(() => {
    setOnHomeScreen(true);
  });

</script>

<div id="main">
  <div id="intro-contact">
    <div id="intro">
      <div id="intro-text">
        <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #191919; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title1']}</h1>
        <h1 style="margin: 0; font-size: 48px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title2']}</h1>
        <h1 style="margin: 0; -webkit-text-stroke: 1px #f6f6f6; color: #191919; font-size: 40px; font-family: 'Inter'; paint-order: stroke fill;" class="intro-title">{$t['intro-title3']}</h1>
        <p style="padding-left: 2rem; margin-top: 20px;">{$t['intro-paragraph']}</p>
      </div>
      <div id="contact" style="display: flex; flex-direction: column; gap: 12px; padding: 10px; margin-top: 40px;">
        <div id="github"><img src="/assets/github-logo.svg" alt="Github logo"><a class="anchor" href="https://github.com/Stenberg-N">Stenberg-N</a></div>
        <div id="email" style="user-select: text; word-break: break-all;"><img src="/assets/email-logo.svg" alt="Email logo" style="user-select: none;">stenbergniko@outlook.com</div>
        <div id="location"><img src="/assets/location-pin.svg" alt="Location logo">{$t['contact-location']}</div>
      </div>
    </div>
    <div id="selfie-image">

    </div>
  </div>

  <div class="divider"></div>

  <div id="categories">
    <div id="networking-systems" class="category" style="align-self: flex-start;">
      <h3>Networking & Systems administration</h3>
      <div class="content">
        <span>Test</span>
      </div>
    </div>
    <div id="programming-development" class="category" style="align-self: flex-end;">
      <h3>Programming & Development</h3>
      <div class="content">

      </div>
    </div>
    <div id="cybersecurity" class="category" style="align-self: flex-start;">
      <h3>Cybersecurity</h3>
      <div class="content">
        
      </div>
    </div>
    <div id="hardware-embedded" class="category" style="align-self: flex-end;">
      <h3>Hardware & Embedded systems</h3>
      <div class="content">
        
      </div>
    </div>
    <div id="data-science-ml" class="category" style="align-self: flex-start;">
      <h3>Data science & Machine learning</h3>
      <div class="content">
        
      </div>
    </div>
    <div id="cloud-scripting" class="category" style="align-self: flex-end;">
      <h3>Cloud & Scripting</h3>
      <div class="content">
        
      </div>
    </div>
  </div>
</div>

<style>
  #main {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    justify-content: top;
    justify-self: center;
    width: 75%;
    margin-top: 210px;
    padding: 1rem;
    gap: 100px;
    background-color: #191919;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }

  .divider {
    border-bottom: 1px solid #555;
  }

  #intro-contact {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    gap: 50px;
    padding: 1rem;
    word-wrap: break-word;
    user-select: none;
  }

  #contact div {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  }

  #github img, #email img, #location img {
    max-height: 25px;
    height: 100%;
    max-width: 25px;
    width: 100%;
    filter: brightness(0) invert(0.9);
  }

  #intro, #selfie-image {
    max-width: 60%;
    width: 100%;
    height: 100%;
  }

  #selfie-image {
    max-width: 40%;
    padding: 10px;
    border: 1px solid yellow; 
  }

  #categories {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    gap: 100px;
    padding: 20px;
    user-select: none;
  }

  .category {
    display: flex;
    flex-direction: column;
    max-width: calc(50% - 20px);
    width: 100%;
    height: 500px;
    padding: 10px;
    border-radius: 12px;
    background-color: #777;
    box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  }

  .content {
    padding-left: 1rem;
  }

  .content span {
    display: list-item;
    list-style-type: disc;
    list-style-position: inside;
  }

  @media (max-width: 1150px) {
    #main {
      width: calc(100% - 20px);
    }

    #intro-contact {
      flex-direction: column;
    }

    #intro, #selfie-image {
      max-width: 100%;
    }

    #categories {
      gap: 50px;
    }

    .category {
      max-width: 100%;
    }
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff2) format('woff2');
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
</style>