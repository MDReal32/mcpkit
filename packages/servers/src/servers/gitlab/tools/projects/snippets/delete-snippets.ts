import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsDeleteSnippets = defineTool({
  name: 'projects:snippets:delete_snippets',
  description: 'Delete snippet. Deletes a specified snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/snippets/{id}',
  },
});
