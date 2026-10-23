import { defineTool } from "@usemcpkit/core";

export const groupsGroupImportAndExportGetGroupsExportRelationsDownload = defineTool({
  name: "groups:group_import_and_export:get_groups_export_relations_download",
  description: "Download a relations export for a group. Downloads a group relations export file.",
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
      batched: {
        type: "boolean",
        description:
          "If `true`, downloads the export in batches. All or none of `batched`, `batch_number` must be provided.",
      },
      batch_number: {
        type: "integer",
        description:
          "Number of the export batch to download. All or none of `batched`, `batch_number` must be provided.",
      },
    },
    required: ["id", "relation"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/export_relations/download",
    query: ["relation", "batched", "batch_number"],
  },
});
