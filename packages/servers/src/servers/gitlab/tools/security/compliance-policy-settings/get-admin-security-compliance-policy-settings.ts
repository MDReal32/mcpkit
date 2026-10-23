import { defineTool } from '@usemcpkit/core';

export const securityCompliancePolicySettingsGetAdminSecurityCompliancePolicySettings = defineTool({
  name: 'security:compliance_policy_settings:get_admin_security_compliance_policy_settings',
  description:
    'Retrieve security policy settings. Retrieves the current security policy settings for this GitLab instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/admin/security/compliance_policy_settings',
  },
});
