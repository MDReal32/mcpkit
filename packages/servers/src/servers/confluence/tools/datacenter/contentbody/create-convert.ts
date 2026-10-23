import { defineTool } from '@usemcpkit/core';

export const datacenterContentbodyCreateConvert = defineTool({
  name: 'datacenter:contentbody:create_convert',
  description:
    '[Data Center] Convert body representation. Converts between content body representations. Not all representations can be converted to/from other formats. Supported conversions:',
  input: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'the representation to convert to.',
      },
      expand: {
        type: 'string',
        description:
          'A comma separated list of properties to expand on the content. Default value: <code>body.storage,history,space,version,ancestors</code>',
      },
      representation: {
        type: 'string',
      },
      value: {
        type: 'string',
      },
      webresource: {
        type: 'object',
        properties: {
          keys: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          contexts: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          uris: {
            type: 'object',
          },
          tags: {
            type: 'object',
          },
          superbatch: {
            type: 'object',
          },
        },
      },
      content: {
        type: 'object',
        properties: {
          idProperties: {
            type: 'object',
          },
          expanded: {
            type: 'boolean',
          },
        },
      },
      contentRef: {
        type: 'object',
        properties: {
          idProperties: {
            type: 'object',
          },
          expanded: {
            type: 'boolean',
          },
        },
      },
    },
    required: ['to'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/contentbody/convert/{to}',
    query: ['expand'],
    body: ['representation', 'value', 'webresource', 'content', 'contentRef'],
  },
});
