import { defineTool } from "@usemcpkit/core";

export const adminDataManagementUpdateAdminDataManagementChecksum = defineTool({
  name: "admin:data_management:update_admin_data_management_checksum",
  description:
    "Recalculate the checksum of a model record. Recalculates the checksum of a specified model record. The checksum value is a representation of the queried model hashed with the md5 or sha256 algorithm. Only available to administrators on primary Geo sites.",
  input: {
    type: "object",
    properties: {
      model_name: {
        type: "string",
        description:
          "See https://docs.gitlab.com/administration/admin_area/#data-management for the list of allowed values",
      },
      record_identifier: {
        type: "integer",
        description: "Unique identifier of the record, as returned by the list endpoint.",
      },
    },
    required: ["model_name", "record_identifier"],
  },
  request: {
    method: "PUT",
    path: "/admin/data_management/{model_name}/{record_identifier}/checksum",
  },
});
