<script lang="ts">
	import ProjectPage from "../../../components/ProjectPage.svelte";

  let { data } = $props();
</script>

<ProjectPage options={{ project: data.project }}/>