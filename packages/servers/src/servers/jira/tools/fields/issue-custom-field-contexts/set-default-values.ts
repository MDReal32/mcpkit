import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsSetDefaultValues = defineTool({
  name: 'fields:issue_custom_field_contexts:set_default_values',
  description:
    '[Deprecated] Set custom field contexts default values. Sets default for contexts of a custom field. Default are defined using these objects:',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      defaultValues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            cascadingOptionId: {
              type: 'string',
              description: 'The ID of the default cascading option.',
            },
            contextId: {
              type: 'string',
              description: 'The ID of the context.',
            },
            optionId: {
              type: 'string',
              description: 'The ID of the default option.',
            },
            type: {
              type: 'string',
            },
            optionIds: {
              type: 'array',
              description: 'The list of IDs of the default options.',
              items: {
                type: 'string',
                description: 'The list of IDs of the default options.',
              },
            },
            accountId: {
              type: 'string',
              description: 'The ID of the default user.',
            },
            userFilter: {
              type: 'object',
              description: 'Filter for a User Picker (single) custom field.',
            },
            accountIds: {
              type: 'array',
              description: 'The IDs of the default users.',
              items: {
                type: 'string',
                description: 'The IDs of the default users.',
              },
            },
            groupId: {
              type: 'string',
              description: 'The ID of the the default group.',
            },
            groupIds: {
              type: 'array',
              description: 'The IDs of the default groups.',
              items: {
                type: 'string',
                description: 'The IDs of the default groups.',
              },
            },
            date: {
              type: 'string',
              description: 'The default date in ISO format. Ignored if `useCurrent` is true.',
            },
            useCurrent: {
              type: 'boolean',
              description: 'Whether to use the current date.',
              default: false,
            },
            dateTime: {
              type: 'string',
              description: 'The default date-time in ISO format. Ignored if `useCurrent` is true.',
            },
            url: {
              type: 'string',
              description: 'The default URL.',
            },
            projectId: {
              type: 'string',
              description: 'The ID of the default project.',
            },
            number: {
              type: 'number',
              description: 'The default floating-point number.',
            },
            labels: {
              type: 'array',
              description: 'The default labels value.',
              items: {
                type: 'string',
                description: 'The default labels value.',
              },
            },
            text: {
              type: 'string',
              description: 'The default text. The maximum length is 254 characters.',
            },
            versionId: {
              type: 'string',
              description: 'The ID of the default version.',
            },
            versionOrder: {
              type: 'string',
              description:
                'The order the pickable versions are displayed in. If not provided, the released-first order is used. Available version orders are `"releasedFirst"` and `"unreleasedFirst"`.',
            },
            versionIds: {
              type: 'array',
              description: 'The IDs of the default versions.',
              items: {
                type: 'string',
                description: 'The IDs of the default versions.',
              },
            },
            values: {
              type: 'array',
              description: 'List of string values. The maximum length for a value is 254 characters.',
              items: {
                type: 'string',
                description: 'List of string values. The maximum length for a value is 254 characters.',
              },
            },
            object: {
              type: 'object',
              description: 'The default JSON object.',
            },
          },
          required: ['contextId', 'type'],
        },
      },
    },
    required: ['fieldId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}/context/defaultValue',
    body: ['defaultValues'],
  },
});
