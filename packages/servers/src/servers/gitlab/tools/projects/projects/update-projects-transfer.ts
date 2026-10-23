import { defineTool } from '@usemcpkit/core';

export const projectsProjectsUpdateProjectsTransfer = defineTool({
  name: 'projects:projects:update_projects_transfer',
  description: 'Transfer a project to another namespace. Transfers a project to another namespace.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      namespace: {
        type: 'string',
        description: 'ID or path of the namespace to transfer the project to.',
      },
    },
    required: ['id', 'namespace'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/transfer',
    body: ['namespace'],
  },
});
