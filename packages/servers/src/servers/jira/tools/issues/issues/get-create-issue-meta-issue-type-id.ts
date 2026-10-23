import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetCreateIssueMetaIssueTypeId = defineTool({
  name: "issues:issues:get_create_issue_meta_issue_type_id",
  description:
    "Get create field metadata for a project and issue type id. Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the requests in Create issue and Create issues.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The ID or key of the project.",
      },
      issueTypeId: {
        type: "string",
        description: "The issuetype ID.",
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
    required: ["projectIdOrKey", "issueTypeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/createmeta/{projectIdOrKey}/issuetypes/{issueTypeId}",
    query: ["startAt", "maxResults"],
  },
});
