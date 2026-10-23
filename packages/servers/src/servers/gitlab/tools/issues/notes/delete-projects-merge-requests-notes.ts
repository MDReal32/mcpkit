import { defineTool } from '@usemcpkit/core';

export const issuesNotesDeleteProjectsMergeRequestsNotes = defineTool({
  name: 'issues:notes:delete_projects_merge_requests_notes',
  description: 'Delete a merge request note. Deletes a specified note from a merge request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the resource the note is attached to.',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
    },
    required: ['id', 'noteable_id', 'note_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/merge_requests/{noteable_id}/notes/{note_id}',
  },
});
