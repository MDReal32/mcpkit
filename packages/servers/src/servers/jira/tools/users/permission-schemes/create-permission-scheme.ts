import { defineTool } from '@usemcpkit/core';

export const usersPermissionSchemesCreatePermissionScheme = defineTool({
  name: 'users:permission_schemes:create_permission_scheme',
  description:
    'Create permission scheme. Creates a new permission scheme. You can create a permission scheme with or without defining a set of permission grants.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:',
      },
      description: {
        type: 'string',
        description: 'A description for the permission scheme.',
      },
      body_expand: {
        type: 'string',
        description: 'The expand options available for the permission scheme.',
      },
      id: {
        type: 'integer',
        description: 'The ID of the permission scheme.',
      },
      name: {
        type: 'string',
        description: 'The name of the permission scheme. Must be unique.',
      },
      permissions: {
        type: 'array',
        description:
          'The permission scheme to create or update. See About permission schemes and grants for more information.',
        items: {
          type: 'object',
          description: 'Details about a permission granted to a user or group.',
          properties: {
            holder: {
              type: 'object',
              description:
                'The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See Holder object in *Get all permission schemes* for more information.',
            },
            id: {
              type: 'integer',
              description: 'The ID of the permission granted details.',
            },
            permission: {
              type: 'string',
              description:
                'The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See Built-in permissions in *Get all permission schemes* for more information about the built-in permissions. See the project permission and global permission module documentation for more information about custom permissions.',
            },
            self: {
              type: 'string',
              description: 'The URL of the permission granted details.',
            },
          },
        },
      },
      scope: {
        type: 'object',
        description: 'The scope of the permission scheme.',
        properties: {
          project: {
            type: 'object',
            description: 'The project the item has scope in.',
            properties: {
              avatarUrls: {
                type: 'object',
                description: "The URLs of the project's avatars.",
              },
              id: {
                type: 'string',
                description: 'The ID of the project.',
              },
              key: {
                type: 'string',
                description: 'The key of the project.',
              },
              name: {
                type: 'string',
                description: 'The name of the project.',
              },
              projectCategory: {
                type: 'object',
                description: 'The category the project belongs to.',
              },
              projectTypeKey: {
                type: 'string',
                description: 'The project type of the project.',
                enum: ['software', 'service_desk', 'business', 'product_discovery'],
              },
              self: {
                type: 'string',
                description: 'The URL of the project details.',
              },
              simplified: {
                type: 'boolean',
                description: 'Whether or not the project is simplified.',
              },
            },
          },
          type: {
            type: 'string',
            description: 'The type of scope.',
            enum: ['PROJECT', 'TEMPLATE'],
          },
        },
      },
      self: {
        type: 'string',
        description: 'The URL of the permission scheme.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/permissionscheme',
    query: ['expand'],
    body: {
      description: 'description',
      expand: 'body_expand',
      id: 'id',
      name: 'name',
      permissions: 'permissions',
      scope: 'scope',
      self: 'self',
    },
  },
});
