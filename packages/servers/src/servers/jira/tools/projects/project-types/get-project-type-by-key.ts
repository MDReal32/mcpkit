import { defineTool } from '@usemcpkit/core';

export const projectsProjectTypesGetProjectTypeByKey = defineTool({
  name: 'projects:project_types:get_project_type_by_key',
  description: 'Get project type by key. Returns a project type.',
  input: {
    type: 'object',
    properties: {
      projectTypeKey: {
        type: 'string',
        enum: ['software', 'service_desk', 'business', 'product_discovery'],
        description: 'The key of the project type.',
      },
    },
    required: ['projectTypeKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/type/{projectTypeKey}',
  },
});
