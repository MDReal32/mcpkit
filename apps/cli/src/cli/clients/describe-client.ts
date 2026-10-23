import type { DetectedClient } from "@usemcpkit/clients";
import { toDisplayPath } from "../output/to-display-path";

export const describeClient = (client: DetectedClient) => client.problem ?? toDisplayPath(client.configPath);
