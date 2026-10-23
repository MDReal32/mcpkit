import { codesOfConductTools } from './codes-of-conduct';
import { emojisTools } from './emojis';
import { gitignoreTools } from './gitignore';
import { licensesTools } from './licenses';
import { markdownTools } from './markdown';
import { metaTools } from './meta';
import { rateLimitTools } from './rate-limit';

export const githubMetaTools = [
  ...codesOfConductTools,
  ...emojisTools,
  ...gitignoreTools,
  ...licensesTools,
  ...markdownTools,
  ...metaTools,
  ...rateLimitTools,
];
