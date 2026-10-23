import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesDeleteNamespacesStorageLimitExclusion = defineTool({
  name: "groups:namespaces:delete_namespaces_storage_limit_exclusion",
  description: "Removes a storage limit exclusion for a Namespace. Removes a Namespaces::Storage::LimitExclusion",
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
    method: "DELETE",
    path: "/namespaces/{id}/storage/limit_exclusion",
  },
});
