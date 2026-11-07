<script lang="ts">
  import type { CredentialRequest } from "@usemcpkit/core";
  import { AUTO_CLOSE_DELAY_MS } from "../const";
  import type { FormStatus } from "../types/form-status";
  import { closeAppWindow } from "../window/close-app-window";

  interface Props {
    status: FormStatus;
    request: CredentialRequest;
  }

  let { status, request }: Props = $props();
  const texts = $derived(request.texts);

  $effect(() => {
    if (status !== "saved" && status !== "signing-in") {
      return;
    }
    const timer = setTimeout(closeAppWindow, AUTO_CLOSE_DELAY_MS);
    return () => clearTimeout(timer);
  });
</script>

{#if status === 'saved'}
  <h1>{texts.savedTitle}</h1>
  <p class="muted">{texts.savedBody}</p>
{:else if status === 'signing-in'}
  <h1>{texts.signingInTitle}</h1>
  <p class="muted">{texts.signingInBody}</p>
{:else if status === 'cancelled'}
  <h1>{texts.cancelledTitle}</h1>
  <p class="muted">{texts.cancelledBody}</p>
{/if}
