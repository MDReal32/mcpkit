import { defineGithubServer } from '../../providers/github';
import { githubTools } from './tools';

export const github = defineGithubServer({
  name: 'github',
  description:
    "GitHub REST API: repositories, issues and pull requests, Actions, security, organizations, users, apps, Copilot and meta endpoints. Tools are named '<group>:<resource>:<action>'.",
  tools: githubTools,
});
