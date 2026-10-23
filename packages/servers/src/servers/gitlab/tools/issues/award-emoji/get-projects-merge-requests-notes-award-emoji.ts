import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiGetProjectsMergeRequestsNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:get_projects_merge_requests_notes_award_emoji',
  description:
    'Retrieve an emoji reaction from a merge request comment. Retrieves a specified emoji reaction from a comment on a merge request. This endpoint can be accessed without authentication if the comment is publicly accessible.',
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
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
    },
    required: ['award_id', 'id', 'merge_request_iid', 'note_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/notes/{note_id}/award_emoji/{award_id}',
  },
});
