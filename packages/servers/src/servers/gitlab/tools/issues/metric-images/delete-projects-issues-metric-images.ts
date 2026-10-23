import { defineTool } from "@usemcpkit/core";

export const issuesMetricImagesDeleteProjectsIssuesMetricImages = defineTool({
  name: "issues:metric_images:delete_projects_issues_metric_images",
  description: "Delete a metric image from an incident. Deletes a metric image from an incident.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      metric_image_id: {
        type: "integer",
        description: "ID of the metric image.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of an issuable",
      },
    },
    required: ["id", "metric_image_id", "issue_iid"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/issues/{issue_iid}/metric_images/{metric_image_id}",
  },
});
