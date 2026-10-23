import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCustomPropertiesForReposGetOrganizationDefinitions = defineTool({
  name: 'orgs:orgs:custom_properties_for_repos_get_organization_definitions',
  description:
    'Get all custom properties for an organization. Gets all custom properties defined for an organization. Organization members can read these properties.',
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
    path: '/orgs/{org}/properties/schema',
  },
});
