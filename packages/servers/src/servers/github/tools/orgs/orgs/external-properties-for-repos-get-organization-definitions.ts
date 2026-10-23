import { defineTool } from '@usemcpkit/core';

export const orgsOrgsExternalPropertiesForReposGetOrganizationDefinitions = defineTool({
  name: 'orgs:orgs:external_properties_for_repos_get_organization_definitions',
  description:
    'Get all external custom properties for a GitHub App installation in an organization. Gets all external custom properties defined for the authenticated GitHub App installation on an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/properties/installations/schema',
  },
});
