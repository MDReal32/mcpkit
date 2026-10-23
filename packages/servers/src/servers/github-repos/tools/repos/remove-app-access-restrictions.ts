import { defineTool } from '@usemcpkit/core';

export const reposRemoveAppAccessRestrictions = defineTool({
  name: 'repos:remove_app_access_restrictions',
  description:
    "Remove app access restrictions. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      branch: {
        type: 'string',
        description:
          'The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.',
      },
      apps: {
        type: 'array',
        description:
          'The GitHub Apps that have push access to this branch. Use the slugified version of the app name. **Note**: The list of users, apps, and teams in total is limited to 100 items.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'branch', 'apps'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
    body: ['apps'],
  },
});
