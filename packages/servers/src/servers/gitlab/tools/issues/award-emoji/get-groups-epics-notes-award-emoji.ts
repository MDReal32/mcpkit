import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiGetGroupsEpicsNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:get_groups_epics_notes_award_emoji',
  description:
    'Retrieve an emoji reaction from an epic comment. Retrieves a specified emoji reaction from a comment on an epic. This endpoint can be accessed without authentication if the comment is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      award_id: {
        type: 'integer',
        description: 'ID of the emoji reaction.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
    },
    required: ['award_id', 'id', 'epic_iid', 'note_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epics/{epic_iid}/notes/{note_id}/award_emoji/{award_id}',
  },
});
