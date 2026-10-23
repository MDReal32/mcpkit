import { defineTool } from '@usemcpkit/core';

export const usersUsersGetContextForUser = defineTool({
  name: 'users:users:get_context_for_user',
  description:
    'Get contextual information for a user. Provides hovercard information. You can find out more about someone in relation to their pull requests, issues, repositories, and organizations.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      subject_type: {
        type: 'string',
        enum: ['organization', 'repository', 'issue', 'pull_request'],
        description:
          "Identifies which additional information you'd like to receive about the person's hovercard. Can be `organization`, `repository`, `issue`, `pull_request`. **Required** when using `subject_id`.",
      },
      subject_id: {
        type: 'string',
        description: 'Uses the ID for the `subject_type` you specified. **Required** when using `subject_type`.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/hovercard',
    query: ['subject_type', 'subject_id'],
  },
});
