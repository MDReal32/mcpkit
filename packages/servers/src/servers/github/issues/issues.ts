import { defineGithubServer } from '../../../providers/github';
import { githubIssuesTools } from './tools';

export const githubIssues = defineGithubServer({
  name: 'github_issues',
  description: 'GitHub REST API: issues, pull requests, reactions, projects.',
  tools: githubIssuesTools,
});
