import { defineTool } from "@usemcpkit/core";

export const issuesAlertManagementCreateProjectsAlertManagementAlertsMetricImages = defineTool({
  name: "issues:alert_management:create_projects_alert_management_alerts_metric_images",
  description: "Upload a metric image. Uploads a metric image for a specified alert.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      alert_iid: {
        type: "integer",
        description: "Internal ID of the alert.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      url: {
        type: "string",
        description: "The url to view more metric info",
      },
      url_text: {
        type: "string",
        description: "A description of the image or URL",
      },
    },
    required: ["id", "alert_iid", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/alert_management_alerts/{alert_iid}/metric_images",
    body: ["file", "url", "url_text"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
