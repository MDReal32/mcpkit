import { defineTool } from '@usemcpkit/core';

export const issuesMergeTrainsCreateProjectsMergeTrainsMergeRequests = defineTool({
  name: 'issues:merge_trains:create_projects_merge_trains_merge_requests',
  description: 'Add a merge request to a merge train. Adds a specified merge request to a merge train.',
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
      sha: {
        type: 'string',
        description: 'SHA that must match the `HEAD` of the source branch, otherwise the merge fails.',
      },
      squash: {
        type: 'boolean',
        description: 'If `true`, the commits are squashed into a single commit on merge.',
      },
      when_pipeline_succeeds: {
        type: 'boolean',
        description: 'Deprecated in GitLab 17.11. Use `auto_merge` instead.',
      },
      auto_merge: {
        type: 'boolean',
        description:
          'If `true`, the merge request is added to the merge train when checks pass. If `false` or unspecified, it is added to the merge train immediately.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_trains/merge_requests/{merge_request_iid}',
    body: ['sha', 'squash', 'when_pipeline_succeeds', 'auto_merge'],
  },
});
