import { defineTool } from "@usemcpkit/core";

export const issuesMetricImagesCreateProjectsIssuesMetricImagesAuthorize = defineTool({
  name: "issues:metric_images:create_projects_issues_metric_images_authorize",
  description: "Authorize metric image upload. Authorizes uploading a metric image for a specified incident.",
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
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/metric_images/authorize",
  },
});
