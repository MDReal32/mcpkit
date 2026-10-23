import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldOptionsDeleteCustomFieldOption = defineTool({
  name: "fields:issue_custom_field_options:delete_custom_field_option",
  description: "Delete custom field options (context). Deletes a custom field option.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      contextId: {
        type: "integer",
        description: "The ID of the context from which an option should be deleted.",
      },
      optionId: {
        type: "integer",
        description: "The ID of the option to delete.",
      },
    },
    required: ["fieldId", "contextId", "optionId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}/option/{optionId}",
  },
});
