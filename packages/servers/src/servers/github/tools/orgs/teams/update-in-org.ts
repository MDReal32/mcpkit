import { defineTool } from '@usemcpkit/core';

export const orgsTeamsUpdateInOrg = defineTool({
  name: 'orgs:teams:update_in_org',
  description:
    'Update a team. To edit a team, the authenticated user must either be an organization owner or a team maintainer.',
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
      name: {
        type: 'string',
        description: 'The name of the team.',
      },
      description: {
        type: 'string',
        description: 'The description of the team.',
      },
      privacy: {
        type: 'string',
        description:
          'The level of privacy this team should have. Editing teams without specifying this parameter leaves `privacy` intact. When a team is nested, the `privacy` for parent teams cannot be `secret`. The options are: **For a non-nested team:** * `secret` - only visible to organization owners and members of this team. * `closed` - visible to all members of this organization. **For a parent or child team:**…',
        enum: ['secret', 'closed'],
      },
      notification_setting: {
        type: 'string',
        description:
          'The notification setting the team has chosen. Editing teams without specifying this parameter leaves `notification_setting` intact. The options are: * `notifications_enabled` - team members receive notifications when the team is @mentioned. * `notifications_disabled` - no one receives notifications.',
        enum: ['notifications_enabled', 'notifications_disabled'],
      },
      permission: {
        type: 'string',
        description:
          '**Closing down notice**. The permission that new repositories will be added to the team with when none is specified.',
        default: 'pull',
        enum: ['pull', 'push', 'admin'],
      },
      parent_team_id: {
        type: 'integer',
        description: 'The ID of a team to set as the parent team.',
      },
      parent_team_slug: {
        type: 'string',
        description: 'The slug of a team to set as the parent team. Ignored when `parent_team_id` is also provided.',
      },
    },
    required: ['org', 'team_slug'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/teams/{team_slug}',
    body: [
      'name',
      'description',
      'privacy',
      'notification_setting',
      'permission',
      'parent_team_id',
      'parent_team_slug',
    ],
  },
});
