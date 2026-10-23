import { defineTool } from '@usemcpkit/core';

export const usersGroupAndUserPickerFindUsersAndGroups = defineTool({
  name: 'users:group_and_user_picker:find_users_and_groups',
  description: 'Find users and groups. Returns a list of users and groups matching a string. The string is used:',
  input: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search string.',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return in each list.',
      },
      showAvatar: {
        type: 'boolean',
        default: false,
        description:
          'Whether the user avatar should be returned. If an invalid value is provided, the default value is used.',
      },
      fieldId: {
        type: 'string',
        description: 'The custom field ID of the field this request is for.',
      },
      projectId: {
        type: 'string',
        description:
          'The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present. (comma-separated)',
      },
      issueTypeId: {
        type: 'string',
        description:
          'The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present. (comma-separated)',
      },
      avatarSize: {
        type: 'string',
        default: 'xsmall',
        enum: [
          'xsmall',
          'xsmall@2x',
          'xsmall@3x',
          'small',
          'small@2x',
          'small@3x',
          'medium',
          'medium@2x',
          'medium@3x',
          'large',
          'large@2x',
          'large@3x',
          'xlarge',
          'xlarge@2x',
          'xlarge@3x',
          'xxlarge',
          'xxlarge@2x',
          'xxlarge@3x',
          'xxxlarge',
          'xxxlarge@2x',
          'xxxlarge@3x',
        ],
        description: 'The size of the avatar to return. If an invalid value is provided, the default value is used.',
      },
      caseInsensitive: {
        type: 'boolean',
        default: false,
        description: 'Whether the search for groups should be case insensitive.',
      },
      excludeConnectAddons: {
        type: 'boolean',
        default: false,
        description:
          'Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used.',
      },
      includeAiAgents: {
        type: 'boolean',
        default: false,
        description:
          'Whether AI Agents should be included in the search results. If an invalid value is provided, the default value is used.',
      },
    },
    required: ['query'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/groupuserpicker',
    query: [
      'query',
      'maxResults',
      'showAvatar',
      'fieldId',
      'projectId',
      'issueTypeId',
      'avatarSize',
      'caseInsensitive',
      'excludeConnectAddons',
      'includeAiAgents',
    ],
  },
});
