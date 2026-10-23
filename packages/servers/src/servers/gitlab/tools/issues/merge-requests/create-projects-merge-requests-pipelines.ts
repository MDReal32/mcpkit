import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsCreateProjectsMergeRequestsPipelines = defineTool({
  name: 'issues:merge_requests:create_projects_merge_requests_pipelines',
  description:
    'Create a merge request pipeline. Creates a merge request pipeline. Pipelines created with this operation must configure `.gitlab-ci.yml` with `only: [merge_requests]` to create jobs.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
      async: {
        type: 'boolean',
        description:
          'If `true`, creates the merge request pipeline asynchronously outside the API request, returning an empty response with a `202` status code. Pipeline creation can still fail after a `202` response.',
        default: false,
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/pipelines',
    body: ['async'],
  },
});
