import { defineTool } from '@usemcpkit/core';

export const issuesNotesDeleteProjectsVulnerabilitiesNotes = defineTool({
  name: 'issues:notes:delete_projects_vulnerabilities_notes',
  description: 'Delete a vulnerability note. Deletes a specified note from a vulnerability.',
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
    path: '/projects/{id}/vulnerabilities/{noteable_id}/notes/{note_id}',
  },
});
