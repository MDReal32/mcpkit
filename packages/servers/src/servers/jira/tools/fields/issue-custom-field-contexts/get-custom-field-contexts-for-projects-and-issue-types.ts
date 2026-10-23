import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsGetCustomFieldContextsForProjectsAndIssueTypes = defineTool({
  name: "fields:issue_custom_field_contexts:get_custom_field_contexts_for_projects_and_issue_types",
  description:
    "Get custom field contexts for projects and issue types. Returns a paginated list of project and issue type mappings and, for each mapping, the ID of a custom field context that applies to the project and issue type.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
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
      mappings: {
        type: "array",
        description: "The project and issue type mappings.",
        items: {
          type: "object",
          description: "The project and issue type mapping.",
          properties: {
            issueTypeId: {
              type: "string",
              description: "The ID of the issue type.",
            },
            projectId: {
              type: "string",
              description: "The ID of the project.",
            },
          },
          required: ["issueTypeId", "projectId"],
        },
      },
    },
    required: ["fieldId", "mappings"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/field/{fieldId}/context/mapping",
    query: ["startAt", "maxResults"],
    body: ["mappings"],
  },
});
