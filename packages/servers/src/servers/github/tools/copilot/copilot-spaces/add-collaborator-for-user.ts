import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesAddCollaboratorForUser = defineTool({
  name: 'copilot:copilot_spaces:add_collaborator_for_user',
  description:
    'Add a collaborator to a Copilot Space for a user. Adds a collaborator to a specific Copilot Space owned by a user. The authenticated user must be the owner of the space or have admin access to the space.',
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
        description: 'The type of actor (must be `User` for user-owned spaces; `Team` will be rejected).',
        enum: ['User', 'Team'],
      },
      actor_identifier: {
        type: 'string',
        description: 'The username of the collaborator. The numeric user ID is also accepted.',
      },
      role: {
        type: 'string',
        description: 'The role to grant to the collaborator.',
        enum: ['reader', 'writer', 'admin'],
      },
    },
    required: ['username', 'space_number', 'actor_type', 'actor_identifier', 'role'],
  },
  request: {
    method: 'POST',
    path: '/users/{username}/copilot-spaces/{space_number}/collaborators',
    body: ['actor_type', 'actor_identifier', 'role'],
  },
});
