import { defineTool } from '@usemcpkit/core';

export const groupsMembersCreateProjectsMembers = defineTool({
  name: 'groups:members:create_projects_members',
  description: 'Add a member to a project. Adds a member to a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      access_level: {
        type: 'integer',
        description: 'A valid access level.',
      },
      user_id: {
        type: 'string',
        description:
          'User ID of the new member, or multiple IDs separated by commas. Required if `username` is not provided. Mutually exclusive with `username`. At least one of `user_id`, `username` must be provided.',
      },
      username: {
        type: 'string',
        description:
          'Username of the new member, or multiple usernames separated by commas. Required if `user_id` is not provided. Mutually exclusive with `user_id`. At least one of `user_id`, `username` must be provided.',
      },
      expires_at: {
        type: 'string',
        description: 'Date string in the format YEAR-MONTH-DAY',
      },
      invite_source: {
        type: 'string',
        description:
          'Source of the invitation that starts the member creation process. GitLab team members can view more information in this confidential issue: `https://gitlab.com/gitlab-org/gitlab/-/issues/327120`.',
        default: 'members-api',
      },
    },
    required: ['id', 'access_level'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/members',
    body: ['access_level', 'user_id', 'username', 'expires_at', 'invite_source'],
  },
});
