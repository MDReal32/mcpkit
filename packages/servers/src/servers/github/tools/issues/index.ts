import { issuesIssuesTools } from './issues';
import { issuesProjectsTools } from './projects';
import { issuesPullRequestStacksTools } from './pull-request-stacks';
import { issuesPullsTools } from './pulls';
import { issuesReactionsTools } from './reactions';

export const issuesGroupTools = [
  ...issuesIssuesTools,
  ...issuesProjectsTools,
  ...issuesPullRequestStacksTools,
  ...issuesPullsTools,
  ...issuesReactionsTools,
];
