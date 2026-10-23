import { defineTool } from '@usemcpkit/core';

export const securityLicensesGetLicenseUsageExport = defineTool({
  name: 'security:licenses:get_license_usage_export',
  description: 'Download license usage data. Downloads usage data for the currently active license.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/license/usage_export',
  },
});
