<script lang="ts">
  import type { CredentialRequest } from "@usemcpkit/core";
  import { untrack } from "svelte";
  import { cancelCredentials } from "../api/cancel-credentials";
  import { importCliToken } from "../api/import-cli-token";
  import { submitCredentials } from "../api/submit-credentials";
  import { buildSignInResponse } from "../form/build-sign-in-response";
  import { buildTokenImportRequest } from "../form/build-token-import-request";
  import { buildTokenResponse } from "../form/build-token-response";
  import { createFormDraft } from "../form/create-form-draft";
  import { resolveVisibleActions } from "../form/resolve-visible-actions";
  import type { FormStatus } from "../types/form-status";
  import type { SubmitResult } from "../types/submit-result";
  import DomainSelect from "./DomainSelect.svelte";
  import FieldInput from "./FieldInput.svelte";
  import OptionActions from "./OptionActions.svelte";

  interface Props {
    request: CredentialRequest;
    onstatus: (status: FormStatus) => void;
  }

  let { request, onstatus }: Props = $props();

  let draft = $state(createFormDraft(untrack(() => request)));
  let errors = $state<readonly string[]>([]);
  let busy = $state(false);
  const chosen = $derived(request.options.find((option) => option.index === draft.option));
  const actions = $derived(resolveVisibleActions(request, draft, chosen));
  const texts = $derived(request.texts);

  const send = async (post: () => Promise<SubmitResult>, doneStatus: FormStatus) => {
    busy = true;
    try {
      const result = await post();
      errors = result.errors;
      if (result.ok) {
        onstatus(doneStatus);
      }
    } catch (error) {
      errors = [error instanceof Error ? error.message : String(error)];
    } finally {
      busy = false;
    }
  };

  const saveToken = (event: SubmitEvent) => {
    event.preventDefault();
    void send(() => submitCredentials(buildTokenResponse(request, draft), texts.requestFailed), "saved");
  };

  const signIn = () =>
    send(() => submitCredentials(buildSignInResponse(request, draft), texts.requestFailed), "signing-in");

  const runAction = (index: number) =>
    send(() => importCliToken(buildTokenImportRequest(request, draft, index), texts.requestFailed), "saved");

  const cancel = async () => {
    await cancelCredentials();
    onstatus("cancelled");
  };
</script>

<h1>{texts.title}</h1>
<p class="muted">{texts.intro}</p>

<form onsubmit={saveToken}>
  {#if request.domain}
    <DomainSelect
      id="domain"
      label={request.domain.label}
      hint={request.domain.hint}
      placeholder={request.domain.placeholder}
      newHostHint={texts.domainNewHost}
      showHostsLabel={texts.domainShowHosts}
      knownHosts={request.domain.knownHosts}
      bind:value={draft.domain}
    />
  {/if}

  {#if request.signIn}
    <button type="button" class="primary" disabled={busy} onclick={signIn}>{texts.signInLabel}</button>
    {#if request.options.length > 0}
      <p class="divider"><span>{texts.tokenDivider}</span></p>
    {/if}
  {/if}

  {#if request.options.length > 1}
    <fieldset class="options">
      <legend>{texts.credentialLegend}</legend>
      {#each request.options as option (option.index)}
        <label class="option">
          <input type="radio" name="option" value={option.index} bind:group={draft.option} />
          {option.label}
        </label>
      {/each}
    </fieldset>
  {/if}

  {#if chosen}
    {#each chosen.fields as field (field.key)}
      <FieldInput
        id={field.key}
        label={field.label}
        hint={field.hint}
        placeholder={field.placeholder}
        secret={field.secret}
        bind:value={() => draft.values[field.key] ?? '', (value) => (draft.values[field.key] = value)}
      />
    {/each}
    <OptionActions {actions} divider={texts.actionsDivider} {busy} onrun={runAction} />
  {/if}

  {#if errors.length > 0}
    <ul class="error">
      {#each errors as error (error)}
        <li>{error}</li>
      {/each}
    </ul>
  {/if}

  <div class="actions">
    <button type="button" class="ghost" disabled={busy} onclick={cancel}>{texts.cancel}</button>
    {#if chosen}
      <button type="submit" class={request.signIn ? 'secondary' : 'primary'} disabled={busy}>{texts.submit}</button>
    {/if}
  </div>
</form>
