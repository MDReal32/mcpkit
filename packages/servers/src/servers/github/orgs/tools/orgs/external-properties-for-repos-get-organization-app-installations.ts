import { defineTool } from '@usemcpkit/core';

export const orgsExternalPropertiesForReposGetOrganizationAppInstallations = defineTool({
  name: 'orgs:external_properties_for_repos_get_organization_app_installations',
  description:
    'Get registered app installations for external custom properties. Gets the registered GitHub App installations used to read and write external custom properties for an organization.',
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
    path: '/orgs/{org}/properties/installations',
  },
});
