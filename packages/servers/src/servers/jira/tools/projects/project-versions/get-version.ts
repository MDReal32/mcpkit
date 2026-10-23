import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsGetVersion = defineTool({
  name: 'projects:project_versions:get_version',
  description: 'Get version. Returns a project version.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/version/{id}',
    query: ['expand'],
  },
});
