import { defineTool } from '@usemcpkit/core';

export const groupsNamespacesCreateNamespacesStorageLimitExclusion = defineTool({
  name: 'groups:namespaces:create_namespaces_storage_limit_exclusion',
  description: 'Creates a storage limit exclusion for a Namespace. Creates a Namespaces::Storage::LimitExclusion',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the namespace.',
      },
      reason: {
        type: 'string',
        description: 'Reason the namespace is being excluded.',
      },
    },
    required: ['id', 'reason'],
  },
  request: {
    method: 'POST',
    path: '/namespaces/{id}/storage/limit_exclusion',
    body: ['reason'],
  },
});
