import { defineTool } from '@usemcpkit/core';

export const orgsExternalPropertiesForReposRegisterOrganizationAppInstallation = defineTool({
  name: 'orgs:external_properties_for_repos_register_organization_app_installation',
  description:
    'Register an app installation for external custom properties. Registers a GitHub App installation so it can read and write external custom properties for an organization, and assigns it a display name.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      installation_id: {
        type: 'integer',
        description:
          'The unique identifier of the GitHub App installation to register for managing external custom properties. When authenticating as a GitHub App installation, this defaults to the authenticated installation and can be omitted. It is required for all other callers (users and fine-grained personal access tokens).',
      },
      display_name: {
        type: 'string',
        description:
          "The display name for this app installation's external custom properties in the organization. Must be 1 to 15 characters and contain only letters and numbers. Capitalization is preserved as entered. This can't be changed after the app installation is registered.",
      },
    },
    required: ['org', 'display_name'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/properties/installations',
    body: ['installation_id', 'display_name'],
  },
});
