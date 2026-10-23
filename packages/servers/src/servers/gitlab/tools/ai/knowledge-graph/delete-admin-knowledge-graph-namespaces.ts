import { defineTool } from '@usemcpkit/core';

export const aiKnowledgeGraphDeleteAdminKnowledgeGraphNamespaces = defineTool({
  name: 'ai:knowledge_graph:delete_admin_knowledge_graph_namespaces',
  description:
    'Disable a namespace for Knowledge Graph. This endpoint disables Knowledge Graph for a specific namespace',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the namespace.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/admin/knowledge_graph/namespaces/{id}',
  },
});
