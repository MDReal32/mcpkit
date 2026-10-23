import { defineTool } from '@usemcpkit/core';

export const actionsDeleteOrgActionsPolicy = defineTool({
  name: 'actions:delete_org_actions_policy',
  description: 'Delete an organization Actions policy. Delete an Actions policy for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      policy_id: {
        type: 'integer',
        description: 'The ID of the policy.',
      },
    },
    required: ['org', 'policy_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/actions/policies/{policy_id}',
  },
});
