import { defineGithubServer } from '../../../providers/github';
import { githubUsersTools } from './tools';

export const githubUsers = defineGithubServer({
  name: 'github_users',
  description: 'GitHub REST API: users, notifications and stars, gists, search.',
  tools: githubUsersTools,
});
