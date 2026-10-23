import { defineTool } from '@usemcpkit/core';

export const usersPermissionsGetBulkPermissions = defineTool({
  name: 'users:permissions:get_bulk_permissions',
  description: 'Get bulk permissions. Returns:',
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description: 'The account ID of a user.',
      },
      globalPermissions: {
        type: 'array',
        description: 'Global permissions to look up.',
        items: {
          type: 'string',
        },
      },
      projectPermissions: {
        type: 'array',
        description: 'Project permissions with associated projects and issues to look up.',
        items: {
          type: 'object',
          description: 'Details of project permissions and associated issues and projects to look up.',
          properties: {
            issues: {
              type: 'array',
              description: 'List of issue IDs.',
              items: {
                type: 'integer',
              },
            },
            permissions: {
              type: 'array',
              description: 'List of project permissions.',
              items: {
                type: 'string',
              },
            },
            projects: {
              type: 'array',
              description: 'List of project IDs.',
              items: {
                type: 'integer',
              },
            },
          },
          required: ['permissions'],
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/permissions/check',
    body: ['accountId', 'globalPermissions', 'projectPermissions'],
  },
});
