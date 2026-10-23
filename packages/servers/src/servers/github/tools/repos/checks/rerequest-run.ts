import { defineTool } from '@usemcpkit/core';

export const reposChecksRerequestRun = defineTool({
  name: 'repos:checks:rerequest_run',
  description:
    'Rerequest a check run. Triggers GitHub to rerequest an existing check run, without pushing new code to a repository. This endpoint will trigger the `check_run` webhook event with the action `rerequested`. When a check run is `rerequested`, the `status` of the check suite it belongs to is reset to `queued` and the `conclusion` is cleared. The check run itself is not updated. GitHub apps recieving the `check_run` webhook…',
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
    },
    required: ['owner', 'repo', 'check_run_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest',
  },
});
