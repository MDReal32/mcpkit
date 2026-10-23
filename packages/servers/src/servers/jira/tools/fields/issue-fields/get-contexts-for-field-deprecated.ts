import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldsGetContextsForFieldDeprecated = defineTool({
  name: "fields:issue_fields:get_contexts_for_field_deprecated",
  description:
    "[Deprecated] Get contexts for a field. Returns a paginated list of the contexts a field is used in. Deprecated, use Get custom field contexts.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the field to return contexts for.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 20,
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["fieldId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/field/{fieldId}/contexts",
    query: ["startAt", "maxResults"],
  },
});
