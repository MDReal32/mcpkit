import { defineTool } from "@usemcpkit/core";

export const cloudFoldersGetFolderPermissions = defineTool({
  name: "cloud:folders:get_folder_permissions",
  description:
    "[Cloud] Get folder permissions. Returns the direct content permissions on a folder with optional filtering. Results are cursor-paginated (max 250 per page).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the folder.",
      },
      operation: {
        type: "string",
        enum: ["read", "update"],
        description: "Filter by operation (`read` or `update`).",
      },
      principal_type: {
        type: "string",
        enum: ["user", "group"],
        description:
          "Filter by principal type (`user` or `group`). May be used without `principal-id` to return all permissions for that type.",
      },
      principal_id: {
        type: "string",
        description: "Filter by principal ID. Must be provided together with `principal-type`.",
      },
      cursor: {
        type: "string",
        description: "Opaque cursor for pagination. Use the value from the previous response's `_links.next`.",
      },
      limit: {
        type: "integer",
        description: "Maximum number of permission entries to return. Must be between 1 and 250.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/folders/{id}/permissions",
    query: {
      operation: "operation",
      "principal-type": "principal_type",
      "principal-id": "principal_id",
      cursor: "cursor",
      limit: "limit",
    },
  },
});
