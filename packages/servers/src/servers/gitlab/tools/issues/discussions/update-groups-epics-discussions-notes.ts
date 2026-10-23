import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsUpdateGroupsEpicsDiscussionsNotes = defineTool({
  name: 'issues:discussions:update_groups_epics_discussions_notes',
  description:
    'Update a comment in an epic discussion. Updates or changes the status of a specified comment in a epic discussion.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the epic.',
      },
      discussion_id: {
        type: 'string',
        description: 'ID of the discussion.',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the discussion note.',
      },
      body: {
        type: 'string',
        description: 'Content of the note or reply. Exactly one of `body`, `resolved` must be provided.',
      },
      resolved: {
        type: 'boolean',
        description:
          'If `true`, resolves the note. If `false`, reopens the note. Exactly one of `body`, `resolved` must be provided.',
      },
    },
    required: ['id', 'noteable_id', 'discussion_id', 'note_id'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}/notes/{note_id}',
    body: ['body', 'resolved'],
  },
});
