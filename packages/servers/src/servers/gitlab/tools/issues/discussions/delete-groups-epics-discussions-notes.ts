import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsDeleteGroupsEpicsDiscussionsNotes = defineTool({
  name: 'issues:discussions:delete_groups_epics_discussions_notes',
  description: 'Delete a comment from an epic discussion. Deletes a specified comment from a epic discussion.',
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
    },
    required: ['id', 'noteable_id', 'discussion_id', 'note_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}/notes/{note_id}',
  },
});
