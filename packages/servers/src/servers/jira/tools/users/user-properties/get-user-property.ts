import { defineTool } from '@usemcpkit/core';

export const usersUserPropertiesGetUserProperty = defineTool({
  name: 'users:user_properties:get_user_property',
  description:
    "Get user property. Returns the value of a user's property. If no property key is provided Get user property keys is called.",
  input: {
    type: 'object',
    properties: {
      propertyKey: {
        type: 'string',
        description: "The key of the user's property.",
      },
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
      },
      userKey: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
      },
      username: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
      },
    },
    required: ['propertyKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/user/properties/{propertyKey}',
    query: ['accountId', 'userKey', 'username'],
  },
});
