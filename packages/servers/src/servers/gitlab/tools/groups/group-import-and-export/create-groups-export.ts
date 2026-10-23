import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportCreateGroupsExport = defineTool({
  name: "groups:group_import_and_export:create_groups_export",
  description: "Create a group export. Creates a group export for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/export",
  },
});
