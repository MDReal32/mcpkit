import { cloudAllTools } from './cloud';
import { cloudV1AllTools } from './cloud-v1';
import { datacenterAllTools } from './datacenter';

export const confluenceTools = [...cloudAllTools, ...cloudV1AllTools, ...datacenterAllTools];
