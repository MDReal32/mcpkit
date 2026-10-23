import { defineTool } from '@usemcpkit/core';

export const oidcDeleteOidcCustomPropertyInclusionForOrg = defineTool({
  name: 'oidc:delete_oidc_custom_property_inclusion_for_org',
  description:
    'Delete an OIDC custom property inclusion for an organization. Removes a repository custom property from being included in the OIDC token for repository actions in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      custom_property_name: {
        type: 'string',
        description: 'The name of the custom property to remove from OIDC token inclusion',
      },
    },
    required: ['org', 'custom_property_name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/actions/oidc/customization/properties/repo/{custom_property_name}',
  },
});
