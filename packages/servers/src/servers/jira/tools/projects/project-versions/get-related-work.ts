import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsGetRelatedWork = defineTool({
  name: 'projects:project_versions:get_related_work',
  description: 'Get related work. Returns related work items for the given version id.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/version/{id}/relatedwork',
  },
});
