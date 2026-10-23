import { defineTool } from "@usemcpkit/core";

export const appsIssueCustomFieldConfigurationAppsUpdateCustomFieldConfiguration = defineTool({
  name: "apps:issue_custom_field_configuration_apps:update_custom_field_configuration",
  description:
    "Update custom field configurations. Update the configuration for contexts of a custom field of a type created by a Forge app.",
  input: {
    type: "object",
    properties: {
      fieldIdOrKey: {
        type: "string",
        description: "The ID or key of the custom field, for example `customfield_10000`.",
      },
      configurations: {
        type: "array",
        description: "The list of custom field configuration details.",
        items: {
          type: "object",
          description: "Details of the contextual configuration for a custom field.",
          properties: {
            configuration: {
              description: "The field configuration.",
            },
            fieldContextId: {
              type: "string",
              description: "The ID of the field context the configuration is associated with.",
            },
            id: {
              type: "string",
              description: "The ID of the configuration.",
            },
            schema: {
              description: "The field value schema.",
            },
          },
          required: ["fieldContextId", "id"],
        },
      },
    },
    required: ["fieldIdOrKey", "configurations"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/app/field/{fieldIdOrKey}/context/configuration",
    body: ["configurations"],
  },
});
