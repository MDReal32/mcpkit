import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsGetProjectContextMapping = defineTool({
  name: "fields:issue_custom_field_contexts:get_project_context_mapping",
  description:
    "Get project mappings for custom field context. Returns a paginated list of context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings are returned. Invalid IDs are ignored.",
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
          "The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`. (comma-separated)",
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
    path: "/rest/api/2/field/{fieldId}/context/projectmapping",
    query: ["contextId", "startAt", "maxResults"],
  },
});
