import { defineGithubServer } from '../../../providers/github';
import { githubSecurityTools } from './tools';

export const githubSecurity = defineGithubServer({
  name: 'github_security',
  description: 'GitHub REST API: code scanning, secret scanning, Dependabot, dependency graph, security advisories.',
  tools: githubSecurityTools,
});
