import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiCreateProjectsMergeRequestsAwardEmoji = defineTool({
  name: 'issues:award_emoji:create_projects_merge_requests_award_emoji',
  description: 'Add an emoji reaction to a merge request. Adds an emoji reaction to a merge request.',
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
      name: {
        type: 'string',
        description: 'Name of the emoji without colons.',
      },
    },
    required: ['id', 'merge_request_iid', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/award_emoji',
    body: ['name'],
  },
});
