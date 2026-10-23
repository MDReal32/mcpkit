import { defineTool } from '@usemcpkit/core';

export const securityCompliancePolicySettingsUpdateProjectsComplianceExternalControlsStatus = defineTool({
  name: 'security:compliance_policy_settings:update_projects_compliance_external_controls_status',
  description:
    'Set status of an external control. Sets the status of a specified external control. Use this operation to inform GitLab that a control has passed or failed a check by an external service.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      control_id: {
        type: 'integer',
        description: 'ID of the control.',
      },
      status: {
        type: 'string',
        description: 'Status of the control.',
        enum: ['pass', 'fail', 'not_applicable'],
      },
    },
    required: ['id', 'control_id', 'status'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/compliance_external_controls/{control_id}/status',
    body: ['status'],
  },
});
