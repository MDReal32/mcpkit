import { defineTool } from '@usemcpkit/core';

export const reposReposGetAppsWithAccessToProtectedBranch = defineTool({
  name: 'repos:repos:get_apps_with_access_to_protected_branch',
  description:
    "Get apps with access to the protected branch. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
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
    },
    required: ['owner', 'repo', 'branch'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
  },
});
