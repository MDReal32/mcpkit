import { defineTool } from "@usemcpkit/core";

export const issuesIssuesDeleteProjectsIssuesLinks = defineTool({
  name: "issues:issues:delete_projects_issues_links",
  description: "Delete an issue link. Deletes a specified issue link, removing the two-way relationship.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "Internal ID of the issue.",
      },
      issue_link_id: {
        type: "string",
        description: "ID of the issue relationship.",
      },
    },
    required: ["id", "issue_iid", "issue_link_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/issues/{issue_iid}/links/{issue_link_id}",
  },
});
