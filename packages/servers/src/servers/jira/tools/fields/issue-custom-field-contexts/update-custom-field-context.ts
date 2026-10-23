import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsUpdateCustomFieldContext = defineTool({
  name: "fields:issue_custom_field_contexts:update_custom_field_context",
  description: "Update custom field context. Updates a custom field context.",
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
      description: {
        type: "string",
        description: "The description of the custom field context. The maximum length is 255 characters.",
      },
      name: {
        type: "string",
        description:
          "The name of the custom field context. The name must be unique. The maximum length is 255 characters.",
      },
    },
    required: ["fieldId", "contextId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}",
    body: ["description", "name"],
  },
});
