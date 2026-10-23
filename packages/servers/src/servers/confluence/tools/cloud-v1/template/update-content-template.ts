import { defineTool } from '@usemcpkit/core';

export const cloudV1TemplateUpdateContentTemplate = defineTool({
  name: 'cloud_v1:template:update_content_template',
  description:
    '[Cloud v1] Update content template. Updates a content template. Note, blueprint templates cannot be updated via the REST API.',
  input: {
    type: 'object',
    properties: {
      templateId: {
        type: 'string',
        description: 'The ID of the template being updated.',
      },
      name: {
        type: 'string',
        description: 'The name of the template. Set to the current `name` if this field is not being updated.',
      },
      templateType: {
        type: 'string',
        description: 'The type of the template. Set to `page`.',
        enum: ['page'],
      },
      body: {
        type: 'object',
        description:
          'The body of the new content. Does not apply to attachments. Only one body format should be specified as the property for this object, e.g. `storage`.',
        properties: {
          view: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          export_view: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          styled_view: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          storage: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          editor: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          editor2: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          wiki: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          atlas_doc_format: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
          anonymous_export_view: {
            type: 'object',
            description: 'This object is used when creating or updating content.',
          },
        },
      },
      description: {
        type: 'string',
        description: 'A description of the template.',
      },
      labels: {
        type: 'array',
        description: 'Labels for the template.',
        items: {
          type: 'object',
        },
      },
      space: {
        type: 'object',
        description:
          'The key for the space of the template. Required if the template is a space template. Set this to the current `space.key`.',
        properties: {
          key: {
            type: 'string',
          },
        },
        required: ['key'],
      },
    },
    required: ['templateId', 'name', 'templateType', 'body'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/template',
    body: ['templateId', 'name', 'templateType', 'body', 'description', 'labels', 'space'],
  },
});
