import { defineGithubServer } from '../../../providers/github';
import { githubActionsTools } from './tools';

export const githubActions = defineGithubServer({
  name: 'github_actions',
  description: 'GitHub REST API: Actions workflows, runs, runners, secrets, variables, caches, artifacts.',
  tools: githubActionsTools,
});
