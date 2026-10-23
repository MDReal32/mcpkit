import { defineTool } from '@usemcpkit/core';

export const codespacesListDevcontainersInRepositoryForAuthenticatedUser = defineTool({
  name: 'codespaces:list_devcontainers_in_repository_for_authenticated_user',
  description:
    'List devcontainer configurations in a repository for the authenticated user. Lists the devcontainer.json files associated with a specified repository and the authenticated user. These files specify launchpoint configurations for codespaces created within the repository.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/codespaces/devcontainers',
    query: ['per_page', 'page'],
  },
});
