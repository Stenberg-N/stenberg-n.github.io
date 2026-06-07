<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from "$app/state";

  import { t, lang } from "$lib/i18n";
</script>

<div class="vertical-flex-box" style="gap: 20px; user-select: none;">
  <p id="error-id">{page.status}</p>
  <h1>{$t["page-not-found"][0]}</h1>
  <p>{page.error?.message}</p>
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