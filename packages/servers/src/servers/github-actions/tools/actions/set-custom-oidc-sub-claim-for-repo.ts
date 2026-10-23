import { defineTool } from '@usemcpkit/core';

export const actionsSetCustomOidcSubClaimForRepo = defineTool({
  name: 'actions:set_custom_oidc_sub_claim_for_repo',
  description:
    'Set the customization template for an OIDC subject claim for a repository. Sets the customization template and `opt-in` or `opt-out` flag for an OpenID Connect (OIDC) subject claim for a repository.',
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
      use_default: {
        type: 'boolean',
        description:
          'Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored.',
      },
      include_claim_keys: {
        type: 'array',
        description:
          'Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.',
        items: {
          type: 'string',
        },
      },
      use_immutable_subject: {
        type: 'boolean',
        description:
          'Whether to opt in to the immutable OIDC subject claim format for this repository. When `true`, OIDC tokens will use a stable, repository-ID-based `sub` claim.',
      },
    },
    required: ['owner', 'repo', 'use_default'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/oidc/customization/sub',
    body: ['use_default', 'include_claim_keys', 'use_immutable_subject'],
  },
});
