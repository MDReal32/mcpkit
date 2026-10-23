import { defineTool } from '@usemcpkit/core';

export const administrationPoliciesSetProjectPolicies = defineTool({
  name: 'administration:policies:set_project_policies',
  description:
    'Set the policies applied to a project. Sets the complete set of policies on a project (full replacement).',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'project ID or project key',
      },
      policyIds: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/policies/project/{projectIdOrKey}/policies',
    body: ['policyIds'],
  },
});
