import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesRemoveCollaboratorForUser = defineTool({
  name: 'copilot:copilot_spaces:remove_collaborator_for_user',
  description:
    'Remove a collaborator from a Copilot Space for a user. Removes a collaborator from a specific Copilot Space owned by a user. The authenticated user must be the owner of the space or have admin access to the space.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      space_number: {
        type: 'integer',
        description: 'The unique identifier of the Copilot Space.',
      },
      actor_type: {
        type: 'string',
        enum: ['User', 'Team'],
        description: 'The type of actor (must be `User` for user-owned spaces; `Team` will be rejected).',
      },
      actor_identifier: {
        type: 'string',
        description: 'The username of the collaborator. The numeric user ID is also accepted.',
      },
    },
    required: ['username', 'space_number', 'actor_type', 'actor_identifier'],
  },
  request: {
    method: 'DELETE',
    path: '/users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}',
  },
});
