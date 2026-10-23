import type { DetectedClient } from '@mcpkit/clients';

export type ClientAction = (client: DetectedClient) => Promise<unknown>;
