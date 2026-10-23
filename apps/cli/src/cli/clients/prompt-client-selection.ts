import { isCancel, multiselect } from '@clack/prompts';
import type { DetectedClient } from '@usemcpkit/clients';
import type { ClientSelectionMode } from '../types/client-selection-mode';
import { describeClient } from './describe-client';

/** Resolves undefined when the user cancels the prompt. */
export const promptClientSelection = async (candidates: readonly DetectedClient[], mode: ClientSelectionMode) => {
  const selected = await multiselect({
    message: mode === 'install' ? 'Add mcpkit to which clients?' : 'Remove mcpkit from which clients?',
    options: candidates.map((client) => ({
      value: client.definition.id,
      label: client.hasEntry && mode === 'install' ? `${client.definition.name} (update)` : client.definition.name,
      hint: describeClient(client),
      disabled: client.problem !== undefined,
    })),
    initialValues: candidates.filter((client) => !client.problem).map((client) => client.definition.id),
    required: false,
  });
  if (isCancel(selected)) {
    return undefined;
  }
  return candidates.filter((client) => selected.includes(client.definition.id));
};
