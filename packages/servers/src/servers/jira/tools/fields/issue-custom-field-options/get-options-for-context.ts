import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldOptionsGetOptionsForContext = defineTool({
  name: "fields:issue_custom_field_options:get_options_for_context",
  description:
    "Get custom field options (context). Returns a paginated list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.",
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
      optionId: {
        type: "integer",
        description: "The ID of the option.",
      },
      onlyOptions: {
        type: "boolean",
        default: false,
        description: "Whether only options are returned.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 100,
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["fieldId", "contextId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}/option",
    query: ["optionId", "onlyOptions", "startAt", "maxResults"],
  },
});
