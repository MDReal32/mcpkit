<script lang="ts">
  import type { ConnectionMethod } from "../types/connection-method";

  interface Props {
    legend: string;
    methods: readonly ConnectionMethod[];
    value: string;
    disabled: boolean;
    onselect: (key: string) => void;
  }

  let { legend, methods, value = $bindable(), disabled, onselect }: Props = $props();
</script>

<fieldset class="methods">
  <legend>{legend}</legend>
  <div class="method-options">
    {#each methods as method (method.key)}
      <label class="method-option">
        <input
          type="radio"
          name="method"
          value={method.key}
          bind:group={value}
          {disabled}
          onchange={() => onselect(method.key)}
        />
        <span>{method.label}</span>
      </label>
    {/each}
  </div>
</fieldset>
