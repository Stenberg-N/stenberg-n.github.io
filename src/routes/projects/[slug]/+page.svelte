<script lang="ts">
  import ProjectPage from "../../../components/ProjectPage.svelte";
  import { getContext } from "svelte";

  let { data } = $props();

  const selectedProject = getContext<{ getSelectedProjectId: () => number | null, setSelectedProjectId: (id: number | null) => void }>('selectedProject');
  let selectedProjectId = $derived(selectedProject.getSelectedProjectId());
</script>

<ProjectPage projectId={data.project.id} isSecondIntroPic={selectedProjectId === 2 ? false : true} />