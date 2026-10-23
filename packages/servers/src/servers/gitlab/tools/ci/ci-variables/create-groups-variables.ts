import { defineTool } from '@usemcpkit/core';

export const ciCiVariablesCreateGroupsVariables = defineTool({
  name: 'ci:ci_variables:create_groups_variables',
  description: 'Create a group variable. Creates a group variable.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      key: {
        type: 'string',
        description:
          'Key of the group variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.',
      },
      value: {
        type: 'string',
        description: 'Value of the variable.',
      },
      protected: {
        type: 'boolean',
        description: 'If `true`, the variable is protected.',
      },
      masked_and_hidden: {
        type: 'boolean',
        description: 'If `true`, the variable is masked and hidden.',
      },
      masked: {
        type: 'boolean',
        description: 'If `true`, the variable is masked.',
      },
      raw: {
        type: 'boolean',
        description: 'If `true`, the variable is treated as a raw string. If `false`, the value is expanded.',
      },
      variable_type: {
        type: 'string',
        description: 'The type of the variable.',
        default: 'env_var',
        enum: ['env_var', 'file'],
      },
      environment_scope: {
        type: 'string',
        description: 'The environment scope of the variable',
      },
      description: {
        type: 'string',
        description: 'Description of the variable. Limited to 255 characters.',
      },
    },
    required: ['id', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/variables',
    body: [
      'key',
      'value',
      'protected',
      'masked_and_hidden',
      'masked',
      'raw',
      'variable_type',
      'environment_scope',
      'description',
    ],
  },
});
