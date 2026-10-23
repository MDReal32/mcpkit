import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsGetProjectsSnippets = defineTool({
  name: 'projects:snippets:get_projects_snippets',
  description: 'Retrieve a project snippet. Retrieves a specified project snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      snippet_id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
    },
    required: ['id', 'snippet_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/snippets/{snippet_id}',
  },
});
