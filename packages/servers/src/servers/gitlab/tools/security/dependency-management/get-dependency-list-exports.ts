import { defineTool } from '@usemcpkit/core';

export const securityDependencyManagementGetDependencyListExports = defineTool({
  name: 'security:dependency_management:get_dependency_list_exports',
  description: 'Retrieve a single dependency list export. Retrieves a dependency list export.',
  input: {
    type: 'object',
    properties: {
      export_id: {
        type: 'string',
        description: 'ID of the dependency list export.',
      },
    },
    required: ['export_id'],
  },
  request: {
    method: 'GET',
    path: '/dependency_list_exports/{export_id}',
  },
});
