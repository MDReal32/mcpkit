import { defineTool } from '@usemcpkit/core';

export const aiKnowledgeGraphUpdateAdminKnowledgeGraphNamespaces = defineTool({
  name: 'ai:knowledge_graph:update_admin_knowledge_graph_namespaces',
  description: 'Enable a namespace for Knowledge Graph. This endpoint enables Knowledge Graph for a specific namespace',
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
    method: 'PUT',
    path: '/admin/knowledge_graph/namespaces/{id}',
  },
});
