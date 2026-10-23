import { defineTool } from '@usemcpkit/core';

export const cloudV1TemplateGetContentTemplate = defineTool({
  name: 'cloud_v1:template:get_content_template',
  description:
    '[Cloud v1] Get content template. Returns a content template. This includes information about template, like the name, the space or blueprint that the template is in, the body of the template, and more.',
  input: {
    type: 'object',
    properties: {
      contentTemplateId: {
        type: 'string',
        description: 'The ID of the content template to be returned.',
      },
      expand: {
        type: 'string',
        description: 'A multi-value parameter indicating which properties of the template to expand. (comma-separated)',
      },
    },
    required: ['contentTemplateId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/template/{contentTemplateId}',
    query: ['expand'],
  },
});
