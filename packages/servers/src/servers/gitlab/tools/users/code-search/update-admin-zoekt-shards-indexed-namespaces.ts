import { defineTool } from '@usemcpkit/core';

export const usersCodeSearchUpdateAdminZoektShardsIndexedNamespaces = defineTool({
  name: 'users:code_search:update_admin_zoekt_shards_indexed_namespaces',
  description:
    'Add a namespace to a node for Zoekt indexing. Enables and assigns a namespace to a specific Zoekt node for code search indexing.',
  input: {
    type: 'object',
    properties: {
      node_id: {
        type: 'integer',
        description: 'ID of the Zoekt node.',
      },
      namespace_id: {
        type: 'integer',
        description: 'ID of the namespace to index on the node.',
      },
      search: {
        type: 'boolean',
        description: 'If `true`, enables the indexed namespace for searching.',
      },
    },
    required: ['node_id', 'namespace_id'],
  },
  request: {
    method: 'PUT',
    path: '/admin/zoekt/shards/{node_id}/indexed_namespaces/{namespace_id}',
    body: ['search'],
  },
});
