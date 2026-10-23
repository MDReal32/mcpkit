import { defineTool } from '@usemcpkit/core';

export const projectsProjectPropertiesGetProjectProperty = defineTool({
  name: 'projects:project_properties:get_project_property',
  description: 'Get project property. Returns the value of a project property.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      propertyKey: {
        type: 'string',
        description:
          'The project property key. Use Get project property keys to get a list of all project property keys.',
      },
    },
    required: ['projectIdOrKey', 'propertyKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectIdOrKey}/properties/{propertyKey}',
  },
});
