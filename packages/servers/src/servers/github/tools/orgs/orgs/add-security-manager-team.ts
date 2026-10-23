import { defineTool } from '@usemcpkit/core';

export const orgsOrgsAddSecurityManagerTeam = defineTool({
  name: 'orgs:orgs:add_security_manager_team',
  description:
    '[Deprecated] Add a security manager team. > [!WARNING] > **Closing down notice:** This operation is closing down and will be removed starting January 1, 2026. Please use the "Organization Roles" endpoints instead.',
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
    },
    required: ['org', 'team_slug'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/security-managers/teams/{team_slug}',
  },
});
