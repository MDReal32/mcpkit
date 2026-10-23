import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldConfigurationsCreateFieldConfiguration = defineTool({
  name: "fields:issue_field_configurations:create_field_configuration",
  description:
    "[Deprecated] Create field configuration. Deprecated, use Field schemes which supports field association schemes.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the field configuration.",
      },
      name: {
        type: "string",
        description: "The name of the field configuration. Must be unique.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/fieldconfiguration",
    body: ["description", "name"],
  },
});
