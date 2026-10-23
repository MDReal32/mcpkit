import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentbodyBulkAsyncConvertContentBodyResponse = defineTool({
  name: 'cloud_v1:contentbody:bulk_async_convert_content_body_response',
  description:
    '[Cloud v1] Get asynchronous content body conversion task result in bulk. Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not completed, the task status is returned instead.',
  input: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        description: 'The asyncIds of the conversion tasks. (comma-separated)',
      },
    },
    required: ['ids'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/contentbody/convert/async/bulk/tasks',
    query: ['ids'],
  },
});
