import { defineTool } from "@usemcpkit/core";

export const issuesAlertManagementUpdateProjectsAlertManagementAlertsMetricImages = defineTool({
  name: "issues:alert_management:update_projects_alert_management_alerts_metric_images",
  description: "Update a metric image. Updates a specified metric image for an alert.",
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
      metric_image_id: {
        type: "integer",
        description: "ID of the metric image.",
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
    required: ["id", "alert_iid", "metric_image_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/alert_management_alerts/{alert_iid}/metric_images/{metric_image_id}",
    body: ["url", "url_text"],
    contentType: "multipart/form-data",
  },
});
