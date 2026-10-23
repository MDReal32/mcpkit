import { defineTool } from '@usemcpkit/core';

export const ciCiVariablesUpdateProjectsVariables = defineTool({
  name: 'ci:ci_variables:update_projects_variables',
  description:
    'Update a variable. Updates a project variable. If there are multiple variables with the same key, use `filter` to select the correct `environment_scope`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key: {
        type: 'string',
        description:
          'Key of the project variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.',
      },
      value: {
        type: 'string',
        description: 'Value of the variable.',
      },
      protected: {
        type: 'boolean',
        description: 'If `true`, the variable is protected.',
      },
      masked: {
        type: 'boolean',
        description: 'If `true`, the variable is masked.',
      },
      environment_scope: {
        type: 'string',
        description: 'Environment scope of the variable.',
      },
      raw: {
        type: 'boolean',
        description: 'If `true`, the variable is treated as a raw string. If `false`, the value is expanded.',
      },
      variable_type: {
        type: 'string',
        description: 'The type of the variable. Default: env_var',
        enum: ['env_var', 'file'],
      },
      filter: {
        type: 'object',
        description: 'Filter results when multiple variables share the same key.',
        properties: {
          environment_scope: {
            type: 'string',
            description: 'Environment scope of the variable.',
          },
        },
      },
      description: {
        type: 'string',
        description: 'Description of the variable. Limited to 255 characters.',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/variables/{key}',
    body: ['value', 'protected', 'masked', 'environment_scope', 'raw', 'variable_type', 'filter', 'description'],
  },
});
