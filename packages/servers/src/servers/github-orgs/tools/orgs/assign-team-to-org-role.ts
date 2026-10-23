import { defineTool } from '@usemcpkit/core';

export const orgsAssignTeamToOrgRole = defineTool({
  name: 'orgs:assign_team_to_org_role',
  description:
    'Assign an organization role to a team. Assigns an organization role to a team in an organization. For more information on organization roles, see "Using organization roles."',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      team_slug: {
        type: 'string',
        description: 'The slug of the team name.',
      },
      role_id: {
        type: 'integer',
        description: 'The unique identifier of the role.',
      },
    },
    required: ['org', 'team_slug', 'role_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/organization-roles/teams/{team_slug}/{role_id}',
  },
});
