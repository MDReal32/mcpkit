import { defineTool } from '@usemcpkit/core';

export const orgsUpdatePatAccess = defineTool({
  name: 'orgs:update_pat_access',
  description:
    "Update the access a fine-grained personal access token has to organization resources. Updates the access an organization member has to organization resources via a fine-grained personal access token. Limited to revoking the token's existing access. Limited to revoking a token's existing access.",
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pat_id: {
        type: 'integer',
        description: 'The unique identifier of the fine-grained personal access token.',
      },
      action: {
        type: 'string',
        description: 'Action to apply to the fine-grained personal access token.',
        enum: ['revoke'],
      },
    },
    required: ['org', 'pat_id', 'action'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/personal-access-tokens/{pat_id}',
    body: ['action'],
  },
});
