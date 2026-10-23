import { defineTool } from '@usemcpkit/core';

export const issuesNotesGetProjectsSnippetsNotes = defineTool({
  name: 'issues:notes:get_projects_snippets_notes',
  description: 'Retrieve a snippet note. Retrieves a specified note for a snippet.',
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
    path: '/projects/{id}/snippets/{noteable_id}/notes/{note_id}',
  },
});
