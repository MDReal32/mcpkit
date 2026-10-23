import { defineTool } from '@usemcpkit/core';

export const orgsExternalPropertiesForReposDeleteOrganizationValues = defineTool({
  name: 'orgs:external_properties_for_repos_delete_organization_values',
  description:
    'Remove all external custom property values for a property across all organization repositories. Removes all external custom property values for a specified property name across all repositories that belong to an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      property_name: {
        type: 'string',
        description: 'The name of the external custom property',
      },
    },
    required: ['org', 'property_name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/properties/installations/values/{property_name}',
  },
});
