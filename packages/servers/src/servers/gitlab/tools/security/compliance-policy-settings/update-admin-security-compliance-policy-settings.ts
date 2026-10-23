import { defineTool } from '@usemcpkit/core';

export const securityCompliancePolicySettingsUpdateAdminSecurityCompliancePolicySettings = defineTool({
  name: 'security:compliance_policy_settings:update_admin_security_compliance_policy_settings',
  description: 'Update security policy settings. Updates the security policy settings for this GitLab instance.',
  input: {
    type: 'object',
    properties: {
      csp_namespace_id: {
        type: 'integer',
        description:
          'ID of the group designated to centrally manage security policies and compliance frameworks. Must be a top-level group. Set to `null` to clear the setting.',
      },
    },
    required: ['csp_namespace_id'],
  },
  request: {
    method: 'PUT',
    path: '/admin/security/compliance_policy_settings',
    body: ['csp_namespace_id'],
  },
});
