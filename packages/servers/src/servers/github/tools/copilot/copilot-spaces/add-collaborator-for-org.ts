import { defineTool } from '@usemcpkit/core';

export const copilotCopilotSpacesAddCollaboratorForOrg = defineTool({
  name: 'copilot:copilot_spaces:add_collaborator_for_org',
  description:
    'Add a collaborator to an organization Copilot Space. Adds a collaborator (user or team) to a specific Copilot Space owned by an organization. The authenticated user must have appropriate permissions to manage collaborators.',
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
        description: 'The type of actor (user or team).',
        enum: ['User', 'Team'],
      },
      actor_identifier: {
        type: 'string',
        description:
          'The username (for users) or team slug (for teams). The numeric ID of a user or team is also accepted.',
      },
      role: {
        type: 'string',
        description: 'The role to grant to the collaborator.',
        enum: ['reader', 'writer', 'admin'],
      },
    },
    required: ['org', 'space_number', 'actor_type', 'actor_identifier', 'role'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/copilot-spaces/{space_number}/collaborators',
    body: ['actor_type', 'actor_identifier', 'role'],
  },
});
