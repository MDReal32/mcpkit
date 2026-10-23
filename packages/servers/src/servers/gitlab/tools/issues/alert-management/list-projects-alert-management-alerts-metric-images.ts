import { defineTool } from "@usemcpkit/core";

export const issuesAlertManagementListProjectsAlertManagementAlertsMetricImages = defineTool({
  name: "issues:alert_management:list_projects_alert_management_alerts_metric_images",
  description: "List all metric images. Lists all metric images for a specified alert.",
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
    },
    required: ["id", "alert_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/alert_management_alerts/{alert_iid}/metric_images",
  },
});
