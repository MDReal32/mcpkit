import { defineTool } from "@usemcpkit/core";

export const issuesMetricImagesCreateProjectsIssuesMetricImages = defineTool({
  name: "issues:metric_images:create_projects_issues_metric_images",
  description:
    "Upload a metric image for an incident. Uploads a screenshot of metric charts for an incident. Available only for incidents.",
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
      file: {
        type: "string",
        description: "Path of a local file to upload.",
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
    required: ["id", "issue_iid", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/metric_images",
    body: ["file", "url", "url_text"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
