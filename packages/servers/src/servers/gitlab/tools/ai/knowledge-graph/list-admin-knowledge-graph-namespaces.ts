import { defineTool } from "@usemcpkit/core";

export const aiKnowledgeGraphListAdminKnowledgeGraphNamespaces = defineTool({
  name: "ai:knowledge_graph:list_admin_knowledge_graph_namespaces",
  description:
    "Get all enabled namespaces for Knowledge Graph. This endpoint retrieves all namespaces that have Knowledge Graph enabled",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/admin/knowledge_graph/namespaces",
  },
});
