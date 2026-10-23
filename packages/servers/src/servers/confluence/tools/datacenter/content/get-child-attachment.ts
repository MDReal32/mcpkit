import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetChildAttachment = defineTool({
  name: 'datacenter:content:get_child_attachment',
  description:
    '[Data Center] Get attachment. Returns a paginated list of attachment Content entities within a single container.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The id of the content the attachment is on.',
      },
      expand: {
        type: 'string',
        description: '(optional) a comma separated list of properties to expand on the Attachments returned. Optional.',
      },
      filename: {
        type: 'string',
        description: '(optional) filter parameter to return only the Attachment with the matching file name.',
      },
      limit: {
        type: 'integer',
        description: '(optional) how many items should be returned after the start index.',
      },
      start: {
        type: 'integer',
        description: '(optional) the index of the first item within the result set that should be returned.',
      },
      mediaType: {
        type: 'string',
        description: '(optional) a comma separated list of properties to expand on the Attachments returned.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/child/attachment',
    query: ['expand', 'filename', 'limit', 'start', 'mediaType'],
  },
});
