import { issuesTools } from './issues';
import { projectsTools } from './projects';
import { pullRequestStacksTools } from './pull-request-stacks';
import { pullsTools } from './pulls';
import { reactionsTools } from './reactions';

export const githubIssuesTools = [
  ...issuesTools,
  ...projectsTools,
  ...pullRequestStacksTools,
  ...pullsTools,
  ...reactionsTools,
];
