<script lang="ts">
  import { t, lang } from "$lib/i18n";
  import { resolve } from '$app/paths';
</script>

<div class="vertical-flex-box" style="gap: 20px; user-select: none;">
  <p id="error-id">404</p>
  <h1>{$t["page-not-found"][1]}</h1>
  <p>{$t["page-not-found"][2]}</p>
  <a id="redirect-home" class="anchor underline-el" href={resolve("/")}>{$lang === 'en' ? "Move to" : "Siirry"} {$t["navigation.anchors.names"][0]}{$lang === 'fi' ? "sivulle" : ""}</a>
</div>

<style>
  #error-id {
    justify-self: flex-start;
    font-size: 6rem;
    font-weight: bold;
  }

  #redirect-home {
    color: rgba(255, 70, 70, 1);
  }
</style>