import { defineTool } from '@usemcpkit/core';

export const ciPipelineSchedulesUpdateProjectsPipelineSchedules = defineTool({
  name: 'ci:pipeline_schedules:update_projects_pipeline_schedules',
  description:
    'Update a pipeline schedule. Updates a pipeline schedule for a project. After the update is done, it is rescheduled automatically.',
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
      description: {
        type: 'string',
        description: 'Description of the pipeline schedule.',
      },
      ref: {
        type: 'string',
        description:
          'Branch or tag name that triggers the pipeline. Accepts either short refs (`main`) or full refs (`refs/heads/main` or `refs/tags/main`). Short refs are automatically expanded to full refs, unless the value could match either a branch or a tag.',
      },
      cron: {
        type: 'string',
        description: 'Cron schedule, for example `0 1 * * *`.',
      },
      cron_timezone: {
        type: 'string',
        description:
          'Time zone supported by `ActiveSupport::TimeZone`, for example `Pacific Time (US & Canada)`, or `TZInfo::Timezone`, for example `America/Los_Angeles`.',
      },
      active: {
        type: 'boolean',
        description:
          'If `true`, activates the pipeline schedule. If `false`, the pipeline schedule is initially deactivated.',
      },
      inputs: {
        type: 'array',
        description:
          'Array of inputs to pass to the pipeline schedule. Each input has a `name` and a `value`, which can be a string, array, number, or boolean. To delete an existing input, include the `name` field and set `destroy` to `true`.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the input.',
            },
            destroy: {
              type: 'boolean',
              description: 'If `true`, deletes the input.',
            },
            value: {
              type: 'string',
              description: 'Value of the input.',
            },
          },
          required: ['name', 'value'],
        },
      },
    },
    required: ['id', 'pipeline_schedule_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/pipeline_schedules/{pipeline_schedule_id}',
    body: ['description', 'ref', 'cron', 'cron_timezone', 'active', 'inputs'],
  },
});
