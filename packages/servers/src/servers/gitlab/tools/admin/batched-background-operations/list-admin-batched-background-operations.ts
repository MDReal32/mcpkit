import { defineTool } from '@usemcpkit/core';

export const adminBatchedBackgroundOperationsListAdminBatchedBackgroundOperations = defineTool({
  name: 'admin:batched_background_operations:list_admin_batched_background_operations',
  description: 'Get the list of batched background operations. This feature was introduced in GitLab 19.1.',
  input: {
    type: 'object',
    properties: {
      database: {
        type: 'string',
        default: 'main',
        enum: ['main', 'ci', 'sec', 'embedding', 'geo'],
        description: 'Name of the database.',
      },
      job_class_name: {
        type: 'string',
        description: 'Filter operations by job class name.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/admin/batched_background_operations',
    query: ['database', 'job_class_name'],
  },
});
