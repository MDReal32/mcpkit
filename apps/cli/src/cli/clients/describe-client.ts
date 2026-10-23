import type { DetectedClient } from '@mcpkit/clients';
import { toDisplayPath } from '../output/to-display-path';

export const describeClient = (client: DetectedClient) => client.problem ?? toDisplayPath(client.configPath);
