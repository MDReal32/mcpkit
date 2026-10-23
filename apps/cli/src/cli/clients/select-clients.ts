import type { DetectedClient } from '@usemcpkit/clients';
import { ALL_FLAG, CLIENTS_FLAG } from '../const';
import type { ClientSelection } from '../types/client-selection';
import type { ClientSelectionMode } from '../types/client-selection-mode';
import { findRequestedClients } from './find-requested-clients';
import { promptClientSelection } from './prompt-client-selection';

/** `--clients` and `--all` skip the checklist; without them a terminal is required. Resolves undefined on cancel. */
export const selectClients = async (
  candidates: readonly DetectedClient[],
  selection: ClientSelection,
  mode: ClientSelectionMode,
) => {
  if (selection.clients !== undefined) {
    return findRequestedClients(candidates, selection.clients);
  }
  if (selection.all) {
    return candidates.filter((client) => !client.problem);
  }
  if (!process.stdin.isTTY) {
    throw new Error(`no terminal to ask which clients to change: pass ${ALL_FLAG} or ${CLIENTS_FLAG} <id,id>`);
  }
  return promptClientSelection(candidates, mode);
};
