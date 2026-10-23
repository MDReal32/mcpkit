import { defineTool } from "@usemcpkit/core";

export const adminDataManagementGetAdminDataManagement = defineTool({
  name: "admin:data_management:get_admin_data_management",
  description:
    "Retrieve information about a model record. Retrieves information about a specified model record. Only available to administrators.",
  input: {
    type: "object",
    properties: {
      model_name: {
        type: "string",
        description:
          "See https://docs.gitlab.com/administration/admin_area/#data-management for the list of allowed values",
      },
      record_identifier: {
        type: "string",
        description:
          "Unique identifier of the record. Can be an integer or a Base64-encoded string, as returned by the list endpoint.",
      },
    },
    required: ["model_name", "record_identifier"],
  },
  request: {
    method: "GET",
    path: "/admin/data_management/{model_name}/{record_identifier}",
  },
});
