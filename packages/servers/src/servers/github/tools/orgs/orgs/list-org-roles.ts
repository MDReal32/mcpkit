import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListOrgRoles = defineTool({
  name: 'orgs:orgs:list_org_roles',
  description:
    'Get all organization roles for an organization. Lists the organization roles available in this organization. For more information on organization roles, see "Using organization roles."',
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
    path: '/orgs/{org}/organization-roles',
  },
});
