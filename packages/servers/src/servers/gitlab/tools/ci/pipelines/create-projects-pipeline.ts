import { defineTool } from '@usemcpkit/core';

export const ciPipelinesCreateProjectsPipeline = defineTool({
  name: 'ci:pipelines:create_projects_pipeline',
  description: 'Create a pipeline. Creates a pipeline in the specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      ref: {
        type: 'string',
        description: 'Reference',
      },
      variables: {
        type: 'array',
        description:
          'Array of variables to make available in the pipeline. If `variable_type` is omitted, it defaults to `env_var`.',
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Key of the variable.',
            },
            value: {
              type: 'string',
              description: 'Value of the variable.',
            },
            variable_type: {
              type: 'string',
              description: 'Type of the variable.',
              default: 'env_var',
              enum: ['env_var', 'file'],
            },
          },
        },
      },
      inputs: {
        type: 'object',
        description:
          'Map of inputs, as key-value pairs, to use when creating the pipeline. Generally available in GitLab 18.1. Feature flag `ci_inputs_for_pipelines` removed.',
      },
    },
    required: ['id', 'ref'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/pipeline',
    body: ['ref', 'variables', 'inputs'],
  },
});
