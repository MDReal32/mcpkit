import { defineTool } from "@usemcpkit/core";

export const fieldsIssueFieldsGetProjectFields = defineTool({
  name: "fields:issue_fields:get_project_fields",
  description: "Get fields for projects. Returns a paginated list of fields for the requested projects and work types.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        description: "The index of the first item to return in a page of results (page offset).",
        default: 0,
      },
      maxResults: {
        type: "integer",
        description: "The maximum number of items to return per page.",
        default: 50,
      },
      projectId: {
        type: "string",
        description: "The IDs of projects to return fields for. (comma-separated)",
      },
      workTypeId: {
        type: "string",
        description: "The IDs of work types (issue types) to return fields for. (comma-separated)",
      },
      fieldId: {
        type: "string",
        description: "The IDs of fields to return. If not provided, all fields are returned. (comma-separated)",
      },
    },
    required: ["projectId", "workTypeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/projects/fields",
    query: ["startAt", "maxResults", "projectId", "workTypeId", "fieldId"],
  },
});
