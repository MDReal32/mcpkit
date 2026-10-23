import { defineTool } from '@usemcpkit/core';

export const orgsOrgsGetOrgRole = defineTool({
  name: 'orgs:orgs:get_org_role',
  description:
    'Get an organization role. Gets an organization role that is available to this organization. For more information on organization roles, see "Using organization roles."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      role_id: {
        type: 'integer',
        description: 'The unique identifier of the role.',
      },
    },
    required: ['org', 'role_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/organization-roles/{role_id}',
  },
});
