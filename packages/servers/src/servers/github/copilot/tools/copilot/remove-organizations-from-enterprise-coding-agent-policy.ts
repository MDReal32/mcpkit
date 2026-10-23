import { defineTool } from '@usemcpkit/core';

export const copilotRemoveOrganizationsFromEnterpriseCodingAgentPolicy = defineTool({
  name: 'copilot:remove_organizations_from_enterprise_coding_agent_policy',
  description:
    'Remove organizations from the enterprise coding agent policy. Disables Copilot cloud agent for the specified organizations within the enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      organizations: {
        type: 'array',
        description: 'List of organization logins within the enterprise to disable Copilot cloud agent for.',
        items: {
          type: 'string',
        },
      },
      custom_properties: {
        type: 'array',
        description:
          'List of custom property filters to match organizations. Organizations matching any of the specified property name/value pairs will be included. This is a one-time operation, setting the property on an organization in the future will not automatically update its coding agent policy.',
        items: {
          type: 'object',
          properties: {
            property_name: {
              type: 'string',
              description: 'The name of the custom property to filter by.',
            },
            values: {
              type: 'array',
              description: 'The values of the custom property to match.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['property_name', 'values'],
        },
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'DELETE',
    path: '/enterprises/{enterprise}/copilot/policies/coding_agent/organizations',
    body: ['organizations', 'custom_properties'],
  },
});
