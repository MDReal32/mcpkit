import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesListNamespaces = defineTool({
  name: "groups:namespaces:list_namespaces",
  description:
    "List all namespaces. Lists all namespaces available to the current user. If the user is an administrator, this endpoint returns all namespaces in the instance.",
  input: {
    type: "object",
    properties: {
      search: {
        type: "string",
        description: "Return only namespaces that contain the specified value in their name or path.",
      },
      owned_only: {
        type: "boolean",
        description: "If `true`, returns only namespaces owned by the current user.",
      },
      top_level_only: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only top-level namespaces.",
      },
      full_path_search: {
        type: "boolean",
        default: false,
        description: "If `true`, the `search` parameter is matched against the full path of the namespaces.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
      requested_hosted_plan: {
        type: "string",
        description: "Name of the hosted plan requested by the customer.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/namespaces",
    query: ["search", "owned_only", "top_level_only", "full_path_search", "page", "per_page", "requested_hosted_plan"],
  },
});
