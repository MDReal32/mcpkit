import { defineGithubServer } from '../../../providers/github';
import { githubCopilotTools } from './tools';

export const githubCopilot = defineGithubServer({
  name: 'github_copilot',
  description: 'GitHub REST API: Copilot, agents and automations.',
  tools: githubCopilotTools,
});
