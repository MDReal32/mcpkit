import { defineTool } from '@usemcpkit/core';

export const usersPermissionsGetMyPermissions = defineTool({
  name: 'users:permissions:get_my_permissions',
  description:
    "Get my permissions. Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, issue or comment context.",
  input: {
    type: 'object',
    properties: {
      projectKey: {
        type: 'string',
        description: 'The key of project. Ignored if `projectId` is provided.',
      },
      projectId: {
        type: 'string',
        description: 'The ID of project.',
      },
      issueKey: {
        type: 'string',
        description: 'The key of the issue. Ignored if `issueId` is provided.',
      },
      issueId: {
        type: 'string',
        description: 'The ID of the issue.',
      },
      permissions: {
        type: 'string',
        description:
          'A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use Get all permissions.',
      },
      projectUuid: {
        type: 'string',
      },
      projectConfigurationUuid: {
        type: 'string',
      },
      commentId: {
        type: 'string',
        description: 'The ID of the comment.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/mypermissions',
    query: [
      'projectKey',
      'projectId',
      'issueKey',
      'issueId',
      'permissions',
      'projectUuid',
      'projectConfigurationUuid',
      'commentId',
    ],
  },
});
