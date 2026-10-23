import { defineTool } from '@usemcpkit/core';

export const projectsProjectTypesGetAllAccessibleProjectTypes = defineTool({
  name: 'projects:project_types:get_all_accessible_project_types',
  description: 'Get licensed project types. Returns all project types with a valid license.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/type/accessible',
  },
});
