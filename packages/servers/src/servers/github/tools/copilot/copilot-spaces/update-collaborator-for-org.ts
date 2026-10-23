import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesUpdateCollaboratorForOrg = defineTool({
  name: 'copilot:copilot_spaces:update_collaborator_for_org',
  description:
    'Set a collaborator role for an organization Copilot Space. Updates the role of a collaborator for a specific Copilot Space owned by an organization. The authenticated user must have appropriate permissions to manage collaborators.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      space_number: {
        type: 'integer',
        description: 'The unique identifier of the Copilot Space.',
      },
      actor_type: {
        type: 'string',
        enum: ['User', 'Team'],
        description: 'The type of actor (user or team).',
      },
      actor_identifier: {
        type: 'string',
        description:
          'The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted.',
      },
      role: {
        type: 'string',
        description: 'The new role to grant to the collaborator. Use `no_access` to remove the collaborator.',
        enum: ['reader', 'writer', 'admin', 'no_access'],
      },
    },
    required: ['org', 'space_number', 'actor_type', 'actor_identifier', 'role'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}',
    body: ['role'],
  },
});
