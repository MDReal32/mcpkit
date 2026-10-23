import { defineTool } from '@usemcpkit/core';

export const orgsTeamsCheckPermissionsForRepoInOrg = defineTool({
  name: 'orgs:teams:check_permissions_for_repo_in_org',
  description:
    'Check team permissions for a repository. Checks whether a team has `admin`, `push`, `maintain`, `triage`, or `pull` permission for a repository. Repositories inherited through a parent team will also be checked.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      team_slug: {
        type: 'string',
        description: 'The slug of the team name.',
      },
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['org', 'team_slug', 'owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',
  },
});
