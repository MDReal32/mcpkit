import { defineTool } from '@usemcpkit/core';

export const projectsProjectRoleActorsAddActorUsers = defineTool({
  name: 'projects:project_role_actors:add_actor_users',
  description: 'Add actors to project role. Adds actors to a project role for the project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      id: {
        type: 'integer',
        description: 'The ID of the project role. Use Get all project roles to get a list of project role IDs.',
      },
      group: {
        type: 'array',
        description:
          "The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.",
        items: {
          type: 'string',
        },
      },
      groupId: {
        type: 'array',
        description: 'The ID of the group to add. This parameter cannot be used with the `group` parameter.',
        items: {
          type: 'string',
        },
      },
      user: {
        type: 'array',
        description: 'The user account ID of the user to add.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['projectIdOrKey', 'id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/project/{projectIdOrKey}/role/{id}',
    body: ['group', 'groupId', 'user'],
  },
});
