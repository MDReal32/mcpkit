import type { DetectedClient } from '@mcpkit/clients';

/** Resolves `--clients a,b` against the detected clients; throws on ids that are unknown or not installed. */
export const findRequestedClients = (detected: readonly DetectedClient[], idList: string) => {
  const ids = idList
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  const missing = ids.filter((id) => !detected.some((client) => client.definition.id === id));
  if (missing.length > 0) {
    const available = detected.map((client) => client.definition.id).join(', ') || 'none';
    throw new Error(`not found on this computer: ${missing.join(', ')}. Detected: ${available}`);
  }
  return detected.filter((client) => ids.includes(client.definition.id));
};
