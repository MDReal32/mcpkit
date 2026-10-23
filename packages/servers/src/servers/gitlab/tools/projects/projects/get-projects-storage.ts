import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProjectsStorage = defineTool({
  name: 'projects:projects:get_projects_storage',
  description:
    'Retrieve the path to repository storage. Retrieves the path to repository storage for a specified project. If you are using Gitaly Cluster (Praefect), see Praefect-generated replica paths instead. Administrators only.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/storage',
  },
});
