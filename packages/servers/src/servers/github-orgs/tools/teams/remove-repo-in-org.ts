import { defineTool } from '@usemcpkit/core';

export const teamsRemoveRepoInOrg = defineTool({
  name: 'teams:remove_repo_in_org',
  description:
    'Remove a repository from a team. If the authenticated user is an organization owner or a team maintainer, they can remove any repositories from the team. To remove a repository from a team as an organization member, the authenticated user must have admin access to the repository and must be able to see the team. This does not delete the repository, it just removes it from the team.',
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
    method: 'DELETE',
    path: '/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}',
  },
});
