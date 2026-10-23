import { defineTool } from "@usemcpkit/core";

export const issuesMetricImagesListProjectsIssuesMetricImages = defineTool({
  name: "issues:metric_images:list_projects_issues_metric_images",
  description: "List all metric images for an incident. Lists all metric images for an incident.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of an issuable",
      },
    },
    required: ["id", "issue_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{issue_iid}/metric_images",
  },
});
