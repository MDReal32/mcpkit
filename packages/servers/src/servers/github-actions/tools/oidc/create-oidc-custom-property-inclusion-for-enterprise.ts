import { defineTool } from '@usemcpkit/core';

export const oidcCreateOidcCustomPropertyInclusionForEnterprise = defineTool({
  name: 'oidc:create_oidc_custom_property_inclusion_for_enterprise',
  description:
    'Create an OIDC custom property inclusion for an enterprise. Adds a repository custom property to be included in the OIDC token for repository actions in an enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      custom_property_name: {
        type: 'string',
        description: 'The name of the custom property to include in the OIDC token',
      },
    },
    required: ['enterprise', 'custom_property_name'],
  },
  request: {
    method: 'POST',
    path: '/enterprises/{enterprise}/actions/oidc/customization/properties/repo',
    body: ['custom_property_name'],
  },
});
