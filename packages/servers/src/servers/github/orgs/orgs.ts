import { defineGithubServer } from '../../../providers/github';
import { githubOrgsTools } from './tools';

export const githubOrgs = defineGithubServer({
  name: 'github_orgs',
  description: 'GitHub REST API: organizations, teams, billing, interaction limits, migrations, classroom.',
  tools: githubOrgsTools,
});
