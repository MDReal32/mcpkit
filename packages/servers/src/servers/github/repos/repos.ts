import { defineGithubServer } from '../../../providers/github';
import { githubReposTools } from './tools';

export const githubRepos = defineGithubServer({
  name: 'github_repos',
  description: 'GitHub REST API: repositories, branches, commits, releases, deployments, checks, pages, git data.',
  tools: githubReposTools,
});
