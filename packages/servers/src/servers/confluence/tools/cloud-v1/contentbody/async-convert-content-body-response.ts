import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentbodyAsyncConvertContentBodyResponse = defineTool({
  name: 'cloud_v1:contentbody:async_convert_content_body_response',
  description:
    '[Cloud v1] Get asynchronously converted content body from the id or the current status of the task. Returns the content body for the corresponding `asyncId` of a completed conversion task. If the task is not completed, the task status is returned instead.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The asyncId of the macro task to get the converted body.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/contentbody/convert/async/{id}',
  },
});
