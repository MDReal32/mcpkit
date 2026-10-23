import { defineTool } from "@usemcpkit/core";

export const issuesMetricImagesUpdateProjectsIssuesMetricImages = defineTool({
  name: "issues:metric_images:update_projects_issues_metric_images",
  description: "Update a metric image for an incident. Updates a metric image for an incident.",
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
      url: {
        type: "string",
        description: "URL to view more metric information.",
      },
      url_text: {
        type: "string",
        description: "Description of the image or URL.",
      },
    },
    required: ["id", "metric_image_id", "issue_iid"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/issues/{issue_iid}/metric_images/{metric_image_id}",
    body: ["url", "url_text"],
  },
});
