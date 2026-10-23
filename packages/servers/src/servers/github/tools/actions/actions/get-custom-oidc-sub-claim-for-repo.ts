import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetCustomOidcSubClaimForRepo = defineTool({
  name: 'actions:actions:get_custom_oidc_sub_claim_for_repo',
  description:
    'Get the customization template for an OIDC subject claim for a repository. Gets the customization template for an OpenID Connect (OIDC) subject claim.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/oidc/customization/sub',
  },
});
