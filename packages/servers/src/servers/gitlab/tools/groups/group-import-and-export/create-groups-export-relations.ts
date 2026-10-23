import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportCreateGroupsExportRelations = defineTool({
  name: "groups:group_import_and_export:create_groups_export_relations",
  description: "Schedule a relations export for a group. Schedules a relations export for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      batched: {
        type: "boolean",
        description: "If `true`, exports in batches.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/export_relations",
    body: ["batched"],
  },
});
