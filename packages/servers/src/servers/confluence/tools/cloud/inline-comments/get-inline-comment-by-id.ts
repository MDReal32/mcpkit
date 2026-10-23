import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsGetInlineCommentById = defineTool({
  name: 'cloud:inline_comments:get_inline_comment_by_id',
  description: '[Cloud] Get inline comment by id. Retrieves an inline comment by id',
  input: {
    type: 'object',
    properties: {
      comment_id: {
        type: 'integer',
        description: 'The ID of the comment to be retrieved.',
      },
      body_format: {
        type: 'string',
        description:
          'The content format type to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format', 'view', 'export_view', 'anonymous_export_view', 'styled_view', 'editor'],
      },
      version: {
        type: 'integer',
        description:
          "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
      },
      include_properties: {
        type: 'boolean',
        description:
          'Includes content properties associated with this inline comment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_operations: {
        type: 'boolean',
        description:
          'Includes operations associated with this inline comment in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_likes: {
        type: 'boolean',
        description:
          'Includes likes associated with this inline comment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_versions: {
        type: 'boolean',
        description:
          'Includes versions associated with this inline comment in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_version: {
        type: 'boolean',
        description:
          'Includes the current version associated with this inline comment in the response. By default this is included and can be omitted by setting the value to `false`.',
      },
    },
    required: ['comment_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/inline-comments/{comment_id}',
    query: {
      'body-format': 'body_format',
      version: 'version',
      'include-properties': 'include_properties',
      'include-operations': 'include_operations',
      'include-likes': 'include_likes',
      'include-versions': 'include_versions',
      'include-version': 'include_version',
    },
  },
});
