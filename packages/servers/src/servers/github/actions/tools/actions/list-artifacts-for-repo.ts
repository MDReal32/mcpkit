import { defineTool } from '@usemcpkit/core';

export const actionsListArtifactsForRepo = defineTool({
  name: 'actions:list_artifacts_for_repo',
  description: 'List artifacts for a repository. Lists all artifacts for a repository.',
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
      name: {
        type: 'string',
        description: 'The name field of an artifact. When specified, only artifacts with this name will be returned.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/artifacts',
    query: ['per_page', 'page', 'name'],
  },
});
