import { defineTool } from '@usemcpkit/core';

export const issuesNotesGetProjectsMergeRequestsNotes = defineTool({
  name: 'issues:notes:get_projects_merge_requests_notes',
  description: 'Retrieve a merge request note. Retrieves a specified note for a merge request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the resource the note is attached to.',
      },
    },
    required: ['id', 'note_id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{noteable_id}/notes/{note_id}',
  },
});
