import { defineTool } from '@usemcpkit/core';

export const oidcListOidcCustomPropertyInclusionsForEnterprise = defineTool({
  name: 'oidc:list_oidc_custom_property_inclusions_for_enterprise',
  description:
    'List OIDC custom property inclusions for an enterprise. Lists the repository custom properties that are included in the OIDC token for repository actions in an enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/actions/oidc/customization/properties/repo',
  },
});
