import { defineTool } from '@usemcpkit/core';

export const administrationLicenseMetricsGetApproximateApplicationLicenseCount = defineTool({
  name: 'administration:license_metrics:get_approximate_application_license_count',
  description:
    'Get approximate application license count. Returns the total approximate number of user accounts for a single Jira license. Note that this information is cached with a 7-day lifecycle and could be stale at the time of call.',
  input: {
    type: 'object',
    properties: {
      applicationKey: {
        type: 'string',
        enum: ['jira-core', 'jira-product-discovery', 'jira-software', 'jira-servicedesk'],
        description: 'The ID of the application, represents a specific version of Jira.',
      },
    },
    required: ['applicationKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/license/approximateLicenseCount/product/{applicationKey}',
  },
});
