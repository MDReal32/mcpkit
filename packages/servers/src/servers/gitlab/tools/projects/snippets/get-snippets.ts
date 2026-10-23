import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsGetSnippets = defineTool({
  name: 'projects:snippets:get_snippets',
  description: 'Retrieve a snippet. Retrieves a specified snippet.',
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
    method: 'GET',
    path: '/snippets/{id}',
  },
});
