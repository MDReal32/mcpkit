<script lang="ts">
  interface Props {
    id: string;
    label: string;
    hint?: string;
    placeholder?: string;
    newHostHint: string;
    showHostsLabel: string;
    knownHosts: readonly string[];
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
    value = $bindable(),
  }: Props = $props();

  let open = $state(false);
  const listId = $derived(`${id}-hosts`);
  const typed = $derived(value.trim());
  const isNew = $derived(typed !== "" && !knownHosts.includes(typed));

  const pick = (host: string) => {
    value = host;
    open = false;
  };

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      open = false;
    }
  };
</script>

<div class="field combobox">
  <label for={id}>{label}</label>
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
      onfocus={() => (open = knownHosts.length > 0)}
      oninput={() => (open = knownHosts.length > 0)}
      onblur={() => (open = false)}
      onkeydown={closeOnEscape}
    />
    {#if knownHosts.length > 0}
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
        {#each knownHosts as host (host)}
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
  {#if isNew && knownHosts.length > 0}
    <p class="hint">{newHostHint}</p>
  {/if}
  {#if hint}
    <p class="hint">{hint}</p>
  {/if}
</div>
