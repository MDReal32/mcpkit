import { defineTool } from '@usemcpkit/core';

export const projectsProtectedTagsDeleteProjectsProtectedTags = defineTool({
  name: 'projects:protected_tags:delete_projects_protected_tags',
  description: 'Unprotect repository tags. Unprotects a specified protected tag or wildcard protected tag.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the tag or wildcard.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/protected_tags/{name}',
  },
});
