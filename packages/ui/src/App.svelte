<script lang="ts">
  import CredentialsForm from "./components/CredentialsForm.svelte";
  import StatusPanel from "./components/StatusPanel.svelte";
  import { readInjectedRequest } from "./form/read-injected-request";
  import type { FormStatus } from "./types/form-status";

  const load = () => {
    try {
      const request = readInjectedRequest();
      document.title = request.texts.pageTitle;
      return { request, error: "" };
    } catch (error) {
      return { request: undefined, error: error instanceof Error ? error.message : String(error) };
    }
  };

  const { request, error: loadError } = load();
  let status = $state<FormStatus>("ready");
</script>

<main class="card">
  {#if request}
    <p class="brand">{request.texts.brand}</p>
    {#if status === 'ready'}
      <CredentialsForm {request} onstatus={(next) => (status = next)} />
    {:else}
      <StatusPanel {status} {request} />
    {/if}
  {:else}
    <p class="error">{loadError}</p>
  {/if}
</main>
