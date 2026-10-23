import { defineTool } from '@usemcpkit/core';

export const packagesDependencyProxyDeleteGroupsDependencyProxyCache = defineTool({
  name: 'packages:dependency_proxy:delete_groups_dependency_proxy_cache',
  description:
    'Purge the dependency proxy for a group. Purges the dependency proxy for a specified group and schedules the cached manifests and blobs for deletion. This endpoint requires the Owner role for the group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/dependency_proxy/cache',
  },
});
