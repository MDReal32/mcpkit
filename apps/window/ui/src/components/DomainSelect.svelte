<script lang="ts">
  interface Props {
    id: string;
    label: string;
    hint?: string;
    placeholder?: string;
    newHostHint: string;
    showHostsLabel: string;
    knownHosts: readonly string[];
    suggestedHosts: readonly string[];
    /** The host the form opened with; clicking the field while it still holds it selects it whole. */
    prefilled: string;
    canCheck: boolean;
    checkLabel: string;
    checking: boolean;
    /** What Check found for the typed host, such as `Data Center 10.3`. */
    checked: string;
    checkError: string;
    oncheck: () => void;
    value: string;
  }

  let {
    id,
    label,
    hint = "",
    placeholder = "",
    newHostHint,
    showHostsLabel,
    knownHosts,
    suggestedHosts,
    prefilled,
    canCheck,
    checkLabel,
    checking,
    checked,
    checkError,
    oncheck,
    value = $bindable(),
  }: Props = $props();

  let open = $state(false);
  let selectOnMouseUp = false;
  const listId = $derived(`${id}-hosts`);
  const typed = $derived(value.trim());
  const offeredHosts = $derived([...knownHosts, ...suggestedHosts.filter((host) => !knownHosts.includes(host))]);
  const isNew = $derived(typed !== "" && !knownHosts.includes(typed));

  const pick = (host: string) => {
    value = host;
    open = false;
  };

  const selectPrefilled = (event: FocusEvent) => {
    open = offeredHosts.length > 0;
    if (value !== "" && value === prefilled && event.currentTarget instanceof HTMLInputElement) {
      event.currentTarget.select();
      selectOnMouseUp = true;
    }
  };

  const keepSelection = (event: MouseEvent) => {
    if (selectOnMouseUp) {
      event.preventDefault();
      selectOnMouseUp = false;
    }
  };

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      open = false;
    }
  };
</script>

<div class="field combobox">
  <label for={id}>{label}</label>
  <div class="domain-row">
  <div class="combobox-control">
    <input
      {id}
      type="text"
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-autocomplete="list"
      autocomplete="off"
      spellcheck="false"
      {placeholder}
      bind:value
      onfocus={selectPrefilled}
      onmouseup={keepSelection}
      oninput={() => (open = offeredHosts.length > 0)}
      onblur={() => (open = false)}
      onkeydown={closeOnEscape}
    />
    {#if offeredHosts.length > 0}
      <button
        type="button"
        class="combobox-toggle"
        tabindex="-1"
        aria-label={showHostsLabel}
        onmousedown={(event) => event.preventDefault()}
        onclick={() => (open = !open)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    {/if}
    {#if open}
      <ul class="combobox-list" id={listId} role="listbox">
        {#each offeredHosts as host (host)}
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={host === typed}
              tabindex="-1"
              onmousedown={(event) => event.preventDefault()}
              onclick={() => pick(host)}
            >
              {host}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
    {#if canCheck}
      <button type="button" class="domain-check" disabled={checking} onclick={oncheck}>
        {#if checking}
          <span class="spinner" aria-hidden="true"></span>
        {/if}
        {checkLabel}
      </button>
    {/if}
  </div>
  {#if checked}
    <p class="hint domain-checked">{checked}</p>
  {/if}
  {#if checkError}
    <p class="hint domain-check-error">{checkError}</p>
  {/if}
  {#if isNew && knownHosts.length > 0}
    <p class="hint">{newHostHint}</p>
  {/if}
  {#if hint}
    <p class="hint">{hint}</p>
  {/if}
</div>
