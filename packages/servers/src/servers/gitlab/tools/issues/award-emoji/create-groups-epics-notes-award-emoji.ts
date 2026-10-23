import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiCreateGroupsEpicsNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:create_groups_epics_notes_award_emoji',
  description: 'Add an emoji reaction to an epic comment. Adds an emoji reaction to a comment on an epic.',
  input: {
    type: 'object',
    properties: {
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
      name: {
        type: 'string',
        description: 'Name of the emoji without colons.',
      },
    },
    required: ['id', 'epic_iid', 'note_id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/epics/{epic_iid}/notes/{note_id}/award_emoji',
    body: ['name'],
  },
});
