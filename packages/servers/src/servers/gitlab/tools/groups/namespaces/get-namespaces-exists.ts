import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesGetNamespacesExists = defineTool({
  name: "groups:namespaces:get_namespaces_exists",
  description: "Verify namespace availability. Verifies that a namespace is available for use.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Path of the namespace.",
      },
      parent_id: {
        type: "integer",
        description: "ID of the parent namespace. If omitted, only top-level namespaces are considered.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/namespaces/{id}/exists",
    query: ["parent_id"],
  },
});
