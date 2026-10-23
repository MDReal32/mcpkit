import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetHierarchy = defineTool({
  name: 'projects:projects:get_hierarchy',
  description: 'Get project issue type hierarchy. Get the issue type hierarchy for a next-gen project.',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'integer',
        description: 'The ID of the project.',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectId}/hierarchy',
  },
});
