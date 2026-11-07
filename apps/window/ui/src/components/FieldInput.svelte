<script lang="ts">
  interface Props {
    id: string;
    label: string;
    hint?: string;
    secret?: boolean;
    placeholder?: string;
    value: string;
  }

  let { id, label, hint = "", secret = false, placeholder = "", value = $bindable() }: Props = $props();
</script>

<div class="field">
  <label for={id}>{label}</label>
  <input
    {id}
    type={secret ? 'password' : 'text'}
    autocomplete="off"
    spellcheck="false"
    {placeholder}
    bind:value
  />
  {#if hint}
    <p class="hint">{hint}</p>
  {/if}
</div>
