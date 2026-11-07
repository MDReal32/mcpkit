<script lang="ts">
  import type { VisibleAction } from "../types/visible-action";
  import { openWindowLink } from "../window/open-window-link";

  interface Props {
    actions: readonly VisibleAction[];
    divider: string;
  }

  let { actions, divider }: Props = $props();
</script>

{#if actions.length > 0}
  <p class="divider"><span>{divider}</span></p>
  <div class="token-source">
    {#each actions as action (action.index)}
      <a class="button" href={action.href} target="_blank" rel="noopener noreferrer" onclick={openWindowLink}>{action.label}</a>
    {/each}
  </div>
{/if}
