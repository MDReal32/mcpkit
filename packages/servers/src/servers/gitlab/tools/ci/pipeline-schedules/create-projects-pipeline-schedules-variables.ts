import { defineTool } from '@usemcpkit/core';

export const ciPipelineSchedulesCreateProjectsPipelineSchedulesVariables = defineTool({
  name: 'ci:pipeline_schedules:create_projects_pipeline_schedules_variables',
  description: 'Create a variable for a pipeline schedule. Creates a variable for a pipeline schedule.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      pipeline_schedule_id: {
        type: 'integer',
        description: 'ID of the pipeline schedule.',
      },
      key: {
        type: 'string',
        description:
          'Key of the pipeline schedule variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.',
      },
      value: {
        type: 'string',
        description: 'Value of the variable.',
      },
      variable_type: {
        type: 'string',
        description: 'Type of the variable. Defaults to `env_var`.',
        enum: ['env_var', 'file'],
      },
    },
    required: ['id', 'pipeline_schedule_id', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/pipeline_schedules/{pipeline_schedule_id}/variables',
    body: ['key', 'value', 'variable_type'],
  },
});
