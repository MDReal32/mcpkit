import { defineGithubServer } from '../../../providers/github';
import { githubAppsTools } from './tools';

export const githubApps = defineGithubServer({
  name: 'github_apps',
  description: 'GitHub REST API: GitHub Apps, packages, codespaces.',
  tools: githubAppsTools,
});
