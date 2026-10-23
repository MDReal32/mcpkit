import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldOptionsUpdateCustomFieldOption = defineTool({
  name: "fields:issue_custom_field_options:update_custom_field_option",
  description: "Update custom field options (context). Updates the options of a custom field.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      contextId: {
        type: "integer",
        description: "The ID of the context.",
      },
      options: {
        type: "array",
        description: "Details of the options to update.",
        items: {
          type: "object",
          description: "Details of a custom field option for a context.",
          properties: {
            disabled: {
              type: "boolean",
              description: "Whether the option is disabled.",
            },
            id: {
              type: "string",
              description: "The ID of the custom field option.",
            },
            value: {
              type: "string",
              description: "The value of the custom field option.",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["fieldId", "contextId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}/option",
    body: ["options"],
  },
});
