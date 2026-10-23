import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetOrgActionsPolicy = defineTool({
  name: 'actions:actions:get_org_actions_policy',
  description: 'Get an organization Actions policy. Get a specific Actions policy for an organization.',
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
    method: 'GET',
    path: '/orgs/{org}/actions/policies/{policy_id}',
  },
});
