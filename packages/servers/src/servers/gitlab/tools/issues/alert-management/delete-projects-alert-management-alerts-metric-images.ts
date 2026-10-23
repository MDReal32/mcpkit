import { defineTool } from '@usemcpkit/core';

export const issuesAlertManagementDeleteProjectsAlertManagementAlertsMetricImages = defineTool({
  name: 'issues:alert_management:delete_projects_alert_management_alerts_metric_images',
  description: 'Delete a metric image. Deletes a specified metric image for an alert.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      alert_iid: {
        type: 'integer',
        description: 'Internal ID of the alert.',
      },
      metric_image_id: {
        type: 'integer',
        description: 'ID of the metric image.',
      },
    },
    required: ['id', 'alert_iid', 'metric_image_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/alert_management_alerts/{alert_iid}/metric_images/{metric_image_id}',
  },
});
