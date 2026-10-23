import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldOptionsReplaceCustomFieldOption = defineTool({
  name: "fields:issue_custom_field_options:replace_custom_field_option",
  description: "Replace custom field options. Replaces the options of a custom field.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      optionId: {
        type: "integer",
        description: "The ID of the option to be deselected.",
      },
      contextId: {
        type: "integer",
        description: "The ID of the context.",
      },
      replaceWith: {
        type: "integer",
        description: "The ID of the option that will replace the currently selected option.",
      },
      jql: {
        type: "string",
        description: "A JQL query that specifies the issues to be updated. For example, *project=10000*.",
      },
    },
    required: ["fieldId", "optionId", "contextId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}/option/{optionId}/issue",
    query: ["replaceWith", "jql"],
  },
});
