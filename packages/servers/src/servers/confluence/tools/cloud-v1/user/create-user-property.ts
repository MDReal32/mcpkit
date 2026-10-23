import { defineTool } from '@usemcpkit/core';

export const cloudV1UserCreateUserProperty = defineTool({
  name: 'cloud_v1:user:create_user_property',
  description:
    '[Cloud v1] Create user property by key. Creates a property for a user. For more information about user properties, see [Confluence entity properties] (https://developer.atlassian.com/cloud/confluence/confluence-entity-properties/). `Note`, these properties stored against a user are on a Confluence site level and not space/content level.',
  input: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description:
          'The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, 384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192',
      },
      key: {
        type: 'string',
        description: 'The key of the user property.',
      },
      value: {
        type: 'object',
        description: 'The value of the user property.',
      },
    },
    required: ['userId', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/user/{userId}/property/{key}',
    body: ['value'],
  },
});
