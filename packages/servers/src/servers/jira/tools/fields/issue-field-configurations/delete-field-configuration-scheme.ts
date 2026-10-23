import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldConfigurationsDeleteFieldConfigurationScheme = defineTool({
  name: "fields:issue_field_configurations:delete_field_configuration_scheme",
  description:
    "[Deprecated] Delete field configuration scheme. Deprecated, use Field schemes which supports field association schemes.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the field configuration scheme.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/fieldconfigurationscheme/{id}",
  },
});
