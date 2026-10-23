import { defineTool } from '@usemcpkit/core';

export const issuesAlertManagementCreateProjectsAlertManagementAlertsMetricImagesAuthorize = defineTool({
  name: 'issues:alert_management:create_projects_alert_management_alerts_metric_images_authorize',
  description:
    'Workhorse authorize metric image file upload. Pre-upload authorization endpoint for metric images attached to alerts. Called by GitLab Workhorse.',
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
    },
    required: ['id', 'alert_iid'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/alert_management_alerts/{alert_iid}/metric_images/authorize',
  },
});
