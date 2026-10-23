import { defineTool } from '@usemcpkit/core';

export const checksListAnnotations = defineTool({
  name: 'checks:list_annotations',
  description: 'List check run annotations. Lists annotations for a check run using the annotation `id`.',
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
      check_run_id: {
        type: 'integer',
        description: 'The unique identifier of the check run.',
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
    required: ['owner', 'repo', 'check_run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations',
    query: ['per_page', 'page'],
  },
});
