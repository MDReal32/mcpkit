import { defineTool } from '@usemcpkit/core';

export const orgsCustomPropertiesForReposGetOrganizationDefinition = defineTool({
  name: 'orgs:custom_properties_for_repos_get_organization_definition',
  description:
    'Get a custom property for an organization. Gets a custom property that is defined for an organization. Organization members can read these properties.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      custom_property_name: {
        type: 'string',
        description: 'The custom property name',
      },
    },
    required: ['org', 'custom_property_name'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/properties/schema/{custom_property_name}',
  },
});
