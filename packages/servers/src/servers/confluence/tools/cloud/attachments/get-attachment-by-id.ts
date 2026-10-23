import { defineTool } from '@usemcpkit/core';

export const cloudAttachmentsGetAttachmentById = defineTool({
  name: 'cloud:attachments:get_attachment_by_id',
  description: '[Cloud] Get attachment by id. Returns a specific attachment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          "The ID of the attachment to be returned. If you don't know the attachment's ID, use Get attachments for page/blogpost/custom content.",
      },
      version: {
        type: 'integer',
        description:
          "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
      },
      include_labels: {
        type: 'boolean',
        description:
          'Includes labels associated with this attachment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_properties: {
        type: 'boolean',
        description:
          'Includes content properties associated with this attachment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_operations: {
        type: 'boolean',
        description:
          'Includes operations associated with this attachment in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_versions: {
        type: 'boolean',
        description:
          'Includes versions associated with this attachment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_version: {
        type: 'boolean',
        description:
          'Includes the current version associated with this attachment in the response. By default this is included and can be omitted by setting the value to `false`.',
      },
      include_collaborators: {
        type: 'boolean',
        description: 'Includes collaborators on the attachment.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/attachments/{id}',
    query: {
      version: 'version',
      'include-labels': 'include_labels',
      'include-properties': 'include_properties',
      'include-operations': 'include_operations',
      'include-versions': 'include_versions',
      'include-version': 'include_version',
      'include-collaborators': 'include_collaborators',
    },
  },
});
