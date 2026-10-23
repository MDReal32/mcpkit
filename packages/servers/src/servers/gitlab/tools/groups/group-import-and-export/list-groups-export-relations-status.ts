import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportListGroupsExportRelationsStatus = defineTool({
  name: "groups:group_import_and_export:list_groups_export_relations_status",
  description:
    "Retrieve the status of an relations export for a group. Retrieves the status of a relations export for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      relation: {
        type: "string",
        description: "Name of the group top-level relation to download or view.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/export_relations/status",
    query: ["relation"],
  },
});
