import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsIssuesClone = defineTool({
  name: "projects:projects:create_projects_issues_clone",
  description:
    "Clone an issue. Clones a specified issue to a project. Copies as much data as possible as long as the target project contains equivalent criteria, such as labels or milestones. If you have insufficient permissions, an error message with status code `400` is returned.",
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
      to_project_id: {
        type: "integer",
        description: "ID of the new project.",
      },
      with_notes: {
        type: "boolean",
        description: "If `true`, clones the issue with its notes.",
        default: false,
      },
    },
    required: ["id", "issue_iid", "to_project_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/clone",
    body: ["to_project_id", "with_notes"],
  },
});
