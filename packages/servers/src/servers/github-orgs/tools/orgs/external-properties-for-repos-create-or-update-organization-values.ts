import { defineTool } from '@usemcpkit/core';

export const orgsExternalPropertiesForReposCreateOrUpdateOrganizationValues = defineTool({
  name: 'orgs:external_properties_for_repos_create_or_update_organization_values',
  description:
    'Create or update external custom property values for organization repositories. Create new or update existing external custom property values for repositories in a batch that belong to an organization. Each target repository will have its external custom property values updated to match the values provided in the request.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      repository_names: {
        type: 'array',
        description: 'The names of repositories that the external custom property values will be applied to.',
        items: {
          type: 'string',
        },
      },
      properties: {
        type: 'array',
        description: 'List of external custom property names and associated values to apply to the repositories.',
        items: {
          type: 'object',
          description: 'Custom property name and associated value',
          properties: {
            property_name: {
              type: 'string',
              description: 'The name of the property',
            },
            value: {
              description: 'The value assigned to the property',
            },
          },
          required: ['property_name', 'value'],
        },
      },
    },
    required: ['org', 'repository_names', 'properties'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/properties/installations/values',
    body: ['repository_names', 'properties'],
  },
});
