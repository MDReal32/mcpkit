import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUser = defineTool({
  name: 'users:users:create_user',
  description:
    'Create user. Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.',
  input: {
    type: 'object',
    properties: {
      applicationKeys: {
        type: 'array',
        description: 'Deprecated, do not use.',
        items: {
          type: 'string',
        },
      },
      displayName: {
        type: 'string',
        description:
          'This property is no longer available. If the user has an Atlassian account, their display name is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account.',
      },
      emailAddress: {
        type: 'string',
        description: 'The email address for the user.',
      },
      key: {
        type: 'string',
        description: 'This property is no longer available. See the migration guide for details.',
      },
      name: {
        type: 'string',
        description: 'This property is no longer available. See the migration guide for details.',
      },
      password: {
        type: 'string',
        description:
          'This property is no longer available. If the user has an Atlassian account, their password is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account.',
      },
      products: {
        type: 'array',
        description:
          'Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery, jira-software. To create a user without product access, set this field to be an empty array.',
        items: {
          type: 'string',
        },
      },
      self: {
        type: 'string',
        description: 'The URL of the user.',
      },
    },
    required: ['emailAddress', 'products'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/user',
    body: ['applicationKeys', 'displayName', 'emailAddress', 'key', 'name', 'password', 'products', 'self'],
  },
});
