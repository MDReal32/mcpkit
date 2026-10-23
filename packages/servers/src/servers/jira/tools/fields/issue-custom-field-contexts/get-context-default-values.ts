import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsGetContextDefaultValues = defineTool({
  name: "fields:issue_custom_field_contexts:get_context_default_values",
  description:
    "Get default values for a custom field grouped by context and issue type. Returns a paginated list of default values grouped by custom field context.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field, for example `customfield\\_10000`.",
      },
      contextId: {
        type: "string",
        description:
          "The IDs of the contexts to return default values for. If omitted, default values for every context the custom field has are returned. (comma-separated)",
      },
      issueTypeId: {
        type: "string",
        description:
          "The IDs of the issue types to restrict the returned per-issue-type default values to. If omitted, default values for every issue type are returned. This filter never removes the catch-all `isAnyIssueType` entry of a context. (comma-separated)",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["fieldId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/field/{fieldId}/context/defaultValues",
    query: ["contextId", "issueTypeId", "startAt", "maxResults"],
  },
});
