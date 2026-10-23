import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesGetNamespacesStorageLimitExclusions = defineTool({
  name: "groups:namespaces:get_namespaces_storage_limit_exclusions",
  description: "Retrieve all limit exclusions. Gets all records for namespaces that have been excluded",
  input: {
    type: "object",
    properties: {
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
    },
  },
  request: {
    method: "GET",
    path: "/namespaces/storage/limit_exclusions",
    query: ["page", "per_page"],
  },
});
