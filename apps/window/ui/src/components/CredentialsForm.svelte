<script lang="ts">
  import type { CredentialRequest } from "@usemcpkit/core";
  import { fillTemplate } from "@usemcpkit/core";
  import { untrack } from "svelte";
  import { cancelCredentials } from "../api/cancel-credentials";
  import { checkHost } from "../api/check-host";
  import { importCliToken } from "../api/import-cli-token";
  import { submitCredentials } from "../api/submit-credentials";
  import { buildMethods } from "../form/build-methods";
  import { buildSignInResponse } from "../form/build-sign-in-response";
  import { buildTokenImportRequest } from "../form/build-token-import-request";
  import { buildTokenResponse } from "../form/build-token-response";
  import { createFormDraft } from "../form/create-form-draft";
  import { findHostSource } from "../form/find-host-source";
  import { isOptionOffered } from "../form/is-option-offered";
  import { pickMethodOption } from "../form/pick-method-option";
  import { resolveVisibleActions } from "../form/resolve-visible-actions";
  import type { CheckedHost } from "../types/checked-host";
  import type { FailedHostCheck } from "../types/failed-host-check";
  import type { FormStatus } from "../types/form-status";
  import type { SubmitResult } from "../types/submit-result";
  import DomainSelect from "./DomainSelect.svelte";
  import FieldInput from "./FieldInput.svelte";
  import MethodPicker from "./MethodPicker.svelte";
  import OptionActions from "./OptionActions.svelte";

  interface Props {
    request: CredentialRequest;
    onstatus: (status: FormStatus) => void;
  }

  let { request, onstatus }: Props = $props();

  let draft = $state(createFormDraft(untrack(() => request)));
  let errors = $state<readonly string[]>([]);
  let busy = $state(false);
  let saving = $state(false);
  let checking = $state(false);
  let check = $state<CheckedHost>();
  let failedCheck = $state<FailedHostCheck>();
  const typedHost = $derived(draft.domain.trim());
  const hostSource = $derived(findHostSource(request.domain?.sources ?? [], typedHost));
  const checked = $derived(check?.host === typedHost ? check.result : undefined);
  const checkError = $derived(failedCheck?.host === typedHost ? failedCheck.message : "");
  const canCheck = $derived(
    request.domain?.check === true && hostSource?.versioned === true && typedHost !== request.domain.value,
  );
  const offered = $derived(
    request.options.filter((option) => isOptionOffered(option.applies, hostSource?.name, checked?.version)),
  );
  const methods = $derived(buildMethods({ ...request, options: offered }));
  const method = $derived(methods.find((candidate) => candidate.key === draft.method));
  const chosen = $derived(method?.type === "manual" ? method.option : undefined);
  const actions = $derived(resolveVisibleActions(request, draft, chosen));
  const texts = $derived(request.texts);

  $effect(() => {
    const [first] = methods;
    if (first && !methods.some((candidate) => candidate.key === draft.method)) {
      untrack(() => {
        draft.method = first.key;
        selectMethod(first.key);
      });
    }
  });

  const checkTypedHost = async () => {
    const host = typedHost;
    checking = true;
    failedCheck = undefined;
    try {
      const values = Object.fromEntries(
        (chosen?.fields ?? []).map((field) => [field.key, draft.values[field.key] ?? ""]),
      );
      const outcome = await checkHost(
        { domain: host, ...(chosen ? { option: chosen.index, values } : {}) },
        texts.requestFailed,
      );
      if (outcome.ok) {
        check = { host, result: outcome.result };
      } else {
        failedCheck = { host, message: outcome.errors.join("; ") };
      }
    } catch (error) {
      failedCheck = { host, message: error instanceof Error ? error.message : String(error) };
    } finally {
      checking = false;
    }
  };

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

  const selectMethod = (key: string) => {
    const selected = methods.find((candidate) => candidate.key === key);
    const option = selected && pickMethodOption(selected);
    if (option !== undefined) {
      draft.option = option;
    }
    errors = [];
  };

  const saveToken = async () => {
    saving = true;
    await send(() => submitCredentials(buildTokenResponse(request, draft), texts.requestFailed), "saved");
    saving = false;
  };

  const signIn = () =>
    send(() => submitCredentials(buildSignInResponse(request, draft), texts.requestFailed), "signing-in");

  const importFromCli = (action: number) =>
    send(() => importCliToken(buildTokenImportRequest(request, draft, action), texts.requestFailed), "saved");

  const connect = async (event: SubmitEvent) => {
    event.preventDefault();
    if (method?.type === "sign-in") {
      await signIn();
    } else if (method?.type === "cli") {
      await importFromCli(method.action);
    } else if (method) {
      await saveToken();
    }
  };

  const cancel = async () => {
    await cancelCredentials();
    onstatus("cancelled");
  };
</script>

<h1>{texts.title}</h1>
<p class="muted">{texts.intro}</p>

<form onsubmit={connect}>
  {#if request.domain}
    <DomainSelect
      id="domain"
      label={request.domain.label}
      hint={request.domain.hint}
      placeholder={request.domain.placeholder}
      newHostHint={texts.domainNewHost}
      showHostsLabel={texts.domainShowHosts}
      knownHosts={request.domain.knownHosts}
      suggestedHosts={request.domain.suggestedHosts ?? []}
      prefilled={request.domain.value}
      {canCheck}
      checkLabel={checking ? texts.domainChecking : texts.domainCheck}
      {checking}
      checked={checked ? fillTemplate(texts.domainChecked, { source: checked.label, version: checked.version ?? '' }).trim() : ''}
      {checkError}
      oncheck={checkTypedHost}
      bind:value={draft.domain}
    />
  {/if}

  {#if methods.length > 1}
    <MethodPicker
      legend={texts.credentialLegend}
      {methods}
      bind:value={draft.method}
      disabled={busy}
      onselect={selectMethod}
    />
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
    <OptionActions {actions} divider={texts.actionsDivider} />
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
    {#if method}
      <button type="submit" class="primary" disabled={busy}>
        {#if saving}
          <span class="spinner" aria-hidden="true"></span>
          {texts.checking}
        {:else if method.type === 'manual'}
          {texts.submit}
        {:else}
          {method.label}
        {/if}
      </button>
    {/if}
  </div>
</form>
