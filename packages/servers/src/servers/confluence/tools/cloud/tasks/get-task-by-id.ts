import { defineTool } from '@usemcpkit/core';

export const cloudTasksGetTaskById = defineTool({
  name: 'cloud:tasks:get_task_by_id',
  description: '[Cloud] Get task by id. Returns a specific task.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          "The ID of the task to be returned. If you don't know the task ID, use Get tasks and filter the results.",
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format'],
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/tasks/{id}',
    query: {
      'body-format': 'body_format',
    },
  },
});
