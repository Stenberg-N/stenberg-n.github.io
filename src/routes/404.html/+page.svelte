<script lang="ts">
  import { resolve } from '$app/paths';

  import { t, lang } from "$lib/i18n/i18n";
</script>

<div id="error-404-container" class="flex vertical marginalized">
  <p id="error-id">404</p>
  <h1>{$t["page-not-found"][1]}</h1>
  <p id="error-message">{$t["page-not-found"][2]}</p>
  <a id="redirect-home" class="anchor" href={resolve("/")}>
    {$lang === 'en' ? "Move to" : "Siirry"} {$t["navigation.anchors.names"][0]}{$lang === 'fi' ? "sivulle" : ""}
  </a>
</div>

<style>
  #error-404-container {
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;

    h1, #error-message {
      margin: 0;
    }

    #error-id {
      justify-self: flex-start;
      font-size: 6rem;
      font-weight: bold;
    }

    #redirect-home {
      color: var(--primary-highlight-color);
    }
  }
</style>