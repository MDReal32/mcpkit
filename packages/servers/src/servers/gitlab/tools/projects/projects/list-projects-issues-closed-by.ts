import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsIssuesClosedBy = defineTool({
  name: "projects:projects:list_projects_issues_closed_by",
  description:
    "List all merge requests that close an issue on merge. Lists all merge requests that close a specified issue when merged. If the project is private or the issue is confidential, you need to provide credentials to authorize. In most cases, you should authenticate with a personal access token.",
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
    },
    required: ["id", "issue_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{issue_iid}/closed_by",
  },
});
