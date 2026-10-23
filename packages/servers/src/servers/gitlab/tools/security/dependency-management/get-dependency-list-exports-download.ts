import { defineTool } from '@usemcpkit/core';

export const securityDependencyManagementGetDependencyListExportsDownload = defineTool({
  name: 'security:dependency_management:get_dependency_list_exports_download',
  description: 'Download dependency list export. Downloads a dependency list export.',
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
    path: '/dependency_list_exports/{export_id}/download',
  },
});
