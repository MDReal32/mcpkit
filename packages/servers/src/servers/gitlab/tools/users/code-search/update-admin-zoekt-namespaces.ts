import { defineTool } from "@usemcpkit/core";

export const usersCodeSearchUpdateAdminZoektNamespaces = defineTool({
  name: "users:code_search:update_admin_zoekt_namespaces",
  description:
    "Update the number of replicas override for an enabled namespace. Updates the replication factor override for a namespace enabled in the Zoekt search engine.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the namespace.",
      },
      number_of_replicas_override: {
        type: "integer",
        description: "Number of replicas override to set. Set to `null` to unset the override.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PATCH",
    path: "/admin/zoekt/namespaces/{id}",
    body: ["number_of_replicas_override"],
  },
});
