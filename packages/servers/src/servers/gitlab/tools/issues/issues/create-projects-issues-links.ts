import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCreateProjectsIssuesLinks = defineTool({
  name: "issues:issues:create_projects_issues_links",
  description:
    "Create an issue link. Creates a two-way relationship between two issues. The user must be allowed to update both issues to succeed.",
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
      target_project_id: {
        type: "string",
        description: "ID or URL-encoded path of the target project.",
      },
      target_issue_iid: {
        type: "string",
        description: "Internal ID of the issue in the target project.",
      },
      link_type: {
        type: "string",
        description: "The type of the relation.",
        default: "relates_to",
        enum: ["relates_to", "blocks", "is_blocked_by"],
      },
    },
    required: ["id", "issue_iid", "target_project_id", "target_issue_iid"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/links",
    body: ["target_project_id", "target_issue_iid", "link_type"],
  },
});
