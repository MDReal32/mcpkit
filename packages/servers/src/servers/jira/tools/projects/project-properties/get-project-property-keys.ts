import { defineTool } from '@usemcpkit/core';

export const projectsProjectPropertiesGetProjectPropertyKeys = defineTool({
  name: 'projects:project_properties:get_project_property_keys',
  description: 'Get project property keys. Returns all project property keys for the project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/properties',
  },
});
