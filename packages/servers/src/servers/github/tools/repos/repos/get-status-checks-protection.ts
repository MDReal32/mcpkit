import { defineTool } from '@usemcpkit/core';

export const reposReposGetStatusChecksProtection = defineTool({
  name: 'repos:repos:get_status_checks_protection',
  description:
    "Get status checks protection. Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see GitHub's products in the GitHub Help documentation.",
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
    path: '/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
  },
});
