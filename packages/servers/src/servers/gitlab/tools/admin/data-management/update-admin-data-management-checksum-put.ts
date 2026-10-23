import { defineTool } from "@usemcpkit/core";

export const adminDataManagementUpdateAdminDataManagementChecksumPut = defineTool({
  name: "admin:data_management:update_admin_data_management_checksum_put",
  description:
    "Recalculate checksums for model records. Recalculates checksums for selected records of a specified model, filtered by `checksum_state` and `identifiers` parameters if provided. The request enqueues a background job to perform the recalculation. Only available to administrators on primary Geo sites.",
  input: {
    type: "object",
    properties: {
      model_name: {
        type: "string",
        description:
          "See https://docs.gitlab.com/administration/admin_area/#data-management for the list of allowed values",
      },
      identifiers: {
        type: "array",
        description:
          "Filter results with an array of unique identifiers of the requested model, which can be integers or base64 encoded strings.",
      },
      checksum_state: {
        type: "string",
        description: "Filter by checksum status.",
        enum: ["started", "succeeded", "failed", "disabled"],
      },
    },
    required: ["model_name"],
  },
  request: {
    method: "PUT",
    path: "/admin/data_management/{model_name}/checksum",
    body: ["identifiers", "checksum_state"],
  },
});
