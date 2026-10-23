import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsUpdateProjectsMergeRequestsMerge = defineTool({
  name: 'issues:merge_requests:update_projects_merge_requests_merge',
  description:
    'Merge a merge request. Merges a merge request. Accepts and merges changes submitted with the merge request.',
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
      merge_commit_message: {
        type: 'string',
        description: 'Custom merge commit message.',
      },
      squash_commit_message: {
        type: 'string',
        description: 'Custom squash commit message.',
      },
      should_remove_source_branch: {
        type: 'boolean',
        description: 'If `true`, removes the source branch.',
      },
      merge_when_pipeline_succeeds: {
        type: 'boolean',
        description:
          'If `true`, merges the merge request automatically once the pipeline succeeds. Deprecated in GitLab 17.11. Use `auto_merge` instead.',
      },
      auto_merge: {
        type: 'boolean',
        description: 'If `true`, the merge request merges when checks pass.',
      },
      sha: {
        type: 'string',
        description:
          'SHA that must match the HEAD of the source branch, otherwise the merge fails. Use to ensure that only reviewed commits are merged. Required if the require a commit SHA on the merge requests API setting is enabled for the group or instance.',
      },
      squash: {
        type: 'boolean',
        description: 'If `true`, squashes all commits into a single commit on merge.',
      },
      skip_merge_train: {
        type: 'boolean',
        description:
          'If `true`, skips the merge train restart when merging immediately in a project configured for merge trains.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/merge',
    body: [
      'merge_commit_message',
      'squash_commit_message',
      'should_remove_source_branch',
      'merge_when_pipeline_succeeds',
      'auto_merge',
      'sha',
      'squash',
      'skip_merge_train',
    ],
  },
});
