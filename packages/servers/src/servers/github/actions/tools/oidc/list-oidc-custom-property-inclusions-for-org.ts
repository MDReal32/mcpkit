import { defineTool } from '@usemcpkit/core';

export const oidcListOidcCustomPropertyInclusionsForOrg = defineTool({
  name: 'oidc:list_oidc_custom_property_inclusions_for_org',
  description:
    'List OIDC custom property inclusions for an organization. Lists the repository custom properties that are included in the OIDC token for repository actions in an organization.',
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
    path: '/orgs/{org}/actions/oidc/customization/properties/repo',
  },
});
