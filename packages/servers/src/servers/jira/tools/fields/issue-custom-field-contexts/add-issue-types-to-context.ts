import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsAddIssueTypesToContext = defineTool({
  name: 'fields:issue_custom_field_contexts:add_issue_types_to_context',
  description:
    'Add issue types to context. Adds issue types to a custom field context, appending the issue types to the issue types list.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      contextId: {
        type: 'integer',
        description: 'The ID of the context.',
      },
      defaultValue: {
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
            properties: {
              enabled: {
                type: 'boolean',
                description: 'Whether the filter is enabled.',
              },
              groups: {
                type: 'array',
                description:
                  'User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 groups can be provided.',
                items: {
                  type: 'string',
                  description:
                    'User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 groups can be provided.',
                },
              },
              roleIds: {
                type: 'array',
                description:
                  'Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 roles can be provided.',
                items: {
                  type: 'integer',
                  description:
                    'Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 roles can be provided.',
                },
              },
            },
            required: ['enabled'],
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
      isAnyIssueType: {
        type: 'boolean',
        description:
          'Whether to add or retain the any-issue-type mapping. At least one of this property or issueTypeIds is required. Defaults to false.',
      },
      issueTypeIds: {
        type: 'array',
        description: 'The issue type IDs to add. Optional when isAnyIssueType is true.',
        items: {
          type: 'string',
          description: 'The issue type IDs to add. Optional when isAnyIssueType is true.',
        },
      },
    },
    required: ['fieldId', 'contextId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}/issuetype',
    body: ['defaultValue', 'isAnyIssueType', 'issueTypeIds'],
  },
});
