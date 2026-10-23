import { defineTool } from '@usemcpkit/core';

export const issuesPullsGetMergeAsyncResult = defineTool({
  name: 'issues:pulls:get_merge_async_result',
  description:
    'Get the result of an asynchronous merge. Fetches the current result of an asynchronous merge request, identified by the UUID that was returned when the merge was requested.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
      },
      uuid: {
        type: 'string',
        description: 'The UUID of the asynchronous merge request, as returned when the merge was requested.',
      },
    },
    required: ['owner', 'repo', 'pull_number', 'uuid'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/merge-async/{uuid}',
  },
});
