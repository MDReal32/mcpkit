import { defineTool } from '@usemcpkit/core';

export const issuesNotesDeleteProjectsWikiPagesNotes = defineTool({
  name: 'issues:notes:delete_projects_wiki_pages_notes',
  description: 'Delete a wiki page meta note. Deletes a specified note from a wiki page meta.',
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
    path: '/projects/{id}/wiki_pages/{noteable_id}/notes/{note_id}',
  },
});
