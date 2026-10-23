import type { DetectedClient } from '@usemcpkit/clients';

export type ClientAction = (client: DetectedClient) => Promise<unknown>;
