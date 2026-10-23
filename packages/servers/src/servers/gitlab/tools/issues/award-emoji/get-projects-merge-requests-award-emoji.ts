import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiGetProjectsMergeRequestsAwardEmoji = defineTool({
  name: 'issues:award_emoji:get_projects_merge_requests_award_emoji',
  description:
    'Retrieve an emoji reaction from a merge request. Retrieves a specified emoji reaction from a merge request. This endpoint can be accessed without authentication if the merge request is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      award_id: {
        type: 'integer',
        description: 'ID of the emoji reaction.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
    },
    required: ['award_id', 'id', 'merge_request_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/award_emoji/{award_id}',
  },
});
