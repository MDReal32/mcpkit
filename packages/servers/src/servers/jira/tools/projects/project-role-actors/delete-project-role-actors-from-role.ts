import { defineTool } from '@usemcpkit/core';

export const projectsProjectRoleActorsDeleteProjectRoleActorsFromRole = defineTool({
  name: 'projects:project_role_actors:delete_project_role_actors_from_role',
  description:
    'Delete default actors from project role. Deletes the default actors from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the project role. Use Get all project roles to get a list of project role IDs.',
      },
      user: {
        type: 'string',
        description: 'The user account ID of the user to remove as a default actor.',
      },
      groupId: {
        type: 'string',
        description:
          'The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group` parameter.',
      },
      group: {
        type: 'string',
        description:
          "The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.",
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/role/{id}/actors',
    query: ['user', 'groupId', 'group'],
  },
});
