<script lang="ts">
  import { untrack } from "svelte";

  interface Props {
    id: string;
    label: string;
    hint?: string;
    placeholder?: string;
    knownHosts: readonly string[];
    value: string;
  }

  const NEW_HOST = "";

  let { id, label, hint = "", placeholder = "", knownHosts, value = $bindable() }: Props = $props();

  let adding = $state(untrack(() => knownHosts.length === 0 || !knownHosts.includes(value)));
  const selected = $derived(adding ? NEW_HOST : value);

  const choose = (event: Event) => {
    const picked = (event.currentTarget as HTMLSelectElement).value;
    adding = picked === NEW_HOST;
    value = adding ? "" : picked;
  };
</script>

<div class="field">
  <label for={id}>{label}</label>
  {#if knownHosts.length > 0}
    <select {id} value={selected} onchange={choose}>
      {#each knownHosts as host (host)}
        <option value={host}>{host}</option>
      {/each}
      <option value={NEW_HOST}>+ Add another host…</option>
    </select>
  {/if}
  {#if adding}
    <input
      id={knownHosts.length > 0 ? `${id}-new` : id}
      type="text"
      autocomplete="off"
      spellcheck="false"
      aria-label={label}
      {placeholder}
      bind:value
    />
  {/if}
  {#if hint}
    <p class="hint">{hint}</p>
  {/if}
</div>
