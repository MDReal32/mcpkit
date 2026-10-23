import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsGetIssueTypeMappingsForContexts = defineTool({
  name: "fields:issue_custom_field_contexts:get_issue_type_mappings_for_contexts",
  description:
    "Get issue types for custom field context. Returns a paginated list of context to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts. Mappings are ordered first by context ID and then by issue type ID.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      contextId: {
        type: "string",
        description:
          "The ID of the context. To include multiple contexts, provide an ampersand-separated list. For example, `contextId=10001&contextId=10002`. (comma-separated)",
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
    path: "/rest/api/2/field/{fieldId}/context/issuetypemapping",
    query: ["contextId", "startAt", "maxResults"],
  },
});
