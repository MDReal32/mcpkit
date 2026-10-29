<script lang="ts">
  import type { VisibleAction } from "../types/visible-action";
  import { openWindowLink } from "../window/open-window-link";

  interface Props {
    actions: readonly VisibleAction[];
    divider: string;
    busy: boolean;
    onrun: (index: number) => void;
  }

  let { actions, divider, busy, onrun }: Props = $props();
</script>

{#if actions.length > 0}
  <p class="divider"><span>{divider}</span></p>
  <div class="token-source">
    {#each actions as action (action.index)}
      {#if action.type === 'link'}
        <a class="button" href={action.href} target="_blank" rel="noopener noreferrer" onclick={openWindowLink}>{action.label}</a>
      {:else}
        <button type="button" disabled={busy} onclick={() => onrun(action.index)}>{action.label}</button>
      {/if}
    {/each}
  </div>
{/if}
