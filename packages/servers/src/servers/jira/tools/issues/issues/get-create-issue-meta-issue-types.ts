import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetCreateIssueMetaIssueTypes = defineTool({
  name: "issues:issues:get_create_issue_meta_issue_types",
  description:
    "Get create metadata issue types for a project. Returns a page of issue type metadata for a specified project. Use the information to populate the requests in Create issue and Create issues.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The ID or key of the project.",
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
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/createmeta/{projectIdOrKey}/issuetypes",
    query: ["startAt", "maxResults"],
  },
});
