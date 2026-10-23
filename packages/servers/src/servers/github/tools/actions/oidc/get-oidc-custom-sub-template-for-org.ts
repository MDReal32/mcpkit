import { defineTool } from '@usemcpkit/core';

export const actionsOidcGetOidcCustomSubTemplateForOrg = defineTool({
  name: 'actions:oidc:get_oidc_custom_sub_template_for_org',
  description:
    'Get the customization template for an OIDC subject claim for an organization. Gets the customization template for an OpenID Connect (OIDC) subject claim.',
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
    path: '/orgs/{org}/actions/oidc/customization/sub',
  },
});
