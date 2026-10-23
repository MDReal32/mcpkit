import { defineTool } from '@usemcpkit/core';

export const usersCodeSearchListAdminZoektShardsIndexedNamespaces = defineTool({
  name: 'users:code_search:list_admin_zoekt_shards_indexed_namespaces',
  description:
    'Get all the indexed namespaces for this node. Retrieves all root namespaces indexed by the specified Zoekt search node.',
  input: {
    type: 'object',
    properties: {
      node_id: {
        type: 'integer',
        description: 'ID of the Zoekt node.',
      },
    },
    required: ['node_id'],
  },
  request: {
    method: 'GET',
    path: '/admin/zoekt/shards/{node_id}/indexed_namespaces',
  },
});
