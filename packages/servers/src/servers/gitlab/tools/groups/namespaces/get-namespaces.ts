import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesGetNamespaces = defineTool({
  name: "groups:namespaces:get_namespaces",
  description: "Retrieve namespace details. Retrieves a specified namespace.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the namespace.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/namespaces/{id}",
  },
});
