import { defineTool } from '@usemcpkit/core';

export const projectsProjectRoleActorsAddProjectRoleActorsToRole = defineTool({
  name: 'projects:project_role_actors:add_project_role_actors_to_role',
  description:
    'Add default actors to project role. Adds default actors to a role. You may add groups or users, but you cannot add groups and users in the same request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the project role. Use Get all project roles to get a list of project role IDs.',
      },
      group: {
        type: 'array',
        description:
          'The name of the group to add as a default actor. This parameter cannot be used with the `groupId` parameter. As a group\'s name can change,use of `groupId` is recommended. This parameter accepts a comma-separated list. For example, `"group":["project-admin", "jira-developers"]`.',
        items: {
          type: 'string',
        },
      },
      groupId: {
        type: 'array',
        description:
          'The ID of the group to add as a default actor. This parameter cannot be used with the `group` parameter This parameter accepts a comma-separated list. For example, `"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8", "0c011f85-69ed-49c4-a801-3b18d0f771bc"]`.',
        items: {
          type: 'string',
        },
      },
      user: {
        type: 'array',
        description:
          'The account IDs of the users to add as default actors. This parameter accepts a comma-separated list. For example, `"user":["5b10a2844c20165700ede21g", "5b109f2e9729b51b54dc274d"]`.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/role/{id}/actors',
    body: ['group', 'groupId', 'user'],
  },
});
