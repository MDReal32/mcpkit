import { defineTool } from '@usemcpkit/core';

export const checksRerequestSuite = defineTool({
  name: 'checks:rerequest_suite',
  description:
    'Rerequest a check suite. Triggers GitHub to rerequest an existing check suite, without pushing new code to a repository. This endpoint will trigger the `check_suite` webhook event with the action `rerequested`. When a check suite is `rerequested`, its `status` is reset to `queued` and the `conclusion` is cleared.',
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
      check_suite_id: {
        type: 'integer',
        description: 'The unique identifier of the check suite.',
      },
    },
    required: ['owner', 'repo', 'check_suite_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest',
  },
});
