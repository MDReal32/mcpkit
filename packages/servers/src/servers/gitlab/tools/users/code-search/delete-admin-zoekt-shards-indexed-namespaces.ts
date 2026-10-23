import { defineTool } from '@usemcpkit/core';

export const usersCodeSearchDeleteAdminZoektShardsIndexedNamespaces = defineTool({
  name: 'users:code_search:delete_admin_zoekt_shards_indexed_namespaces',
  description:
    'Remove a namespace from a node for Zoekt indexing. Removes a namespace from a Zoekt node, deleting its indexed data and disabling search.',
  input: {
    type: 'object',
    properties: {
      node_id: {
        type: 'integer',
        description: 'ID of the Zoekt node.',
      },
      namespace_id: {
        type: 'integer',
        description: 'ID of the namespace to remove from the node.',
      },
    },
    required: ['node_id', 'namespace_id'],
  },
  request: {
    method: 'DELETE',
    path: '/admin/zoekt/shards/{node_id}/indexed_namespaces/{namespace_id}',
  },
});
