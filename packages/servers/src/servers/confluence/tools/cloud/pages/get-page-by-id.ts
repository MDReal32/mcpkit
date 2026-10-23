import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetPageById = defineTool({
  name: 'cloud:pages:get_page_by_id',
  description: '[Cloud] Get page by id. Returns a specific page.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          "The ID of the page to be returned. If you don't know the page ID, use Get pages and filter the results.",
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format', 'view', 'export_view', 'anonymous_export_view', 'styled_view', 'editor'],
      },
      get_draft: {
        type: 'boolean',
        description: 'Retrieve the draft version of this page.',
      },
      status: {
        type: 'string',
        description: 'Filter the page being retrieved by its status. (comma-separated)',
      },
      version: {
        type: 'integer',
        description:
          "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
      },
      include_labels: {
        type: 'boolean',
        description:
          'Includes labels associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_properties: {
        type: 'boolean',
        description:
          'Includes content properties associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_operations: {
        type: 'boolean',
        description:
          'Includes operations associated with this page in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_likes: {
        type: 'boolean',
        description:
          'Includes likes associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_versions: {
        type: 'boolean',
        description:
          'Includes versions associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_version: {
        type: 'boolean',
        description:
          'Includes the current version associated with this page in the response. By default this is included and can be omitted by setting the value to `false`.',
      },
      include_favorited_by_current_user_status: {
        type: 'boolean',
        description: 'Includes whether this page has been favorited by the current user.',
      },
      include_webresources: {
        type: 'boolean',
        description: 'Includes web resources that can be used to render page content on a client.',
      },
      include_collaborators: {
        type: 'boolean',
        description: 'Includes collaborators on the page.',
      },
      include_direct_children: {
        type: 'boolean',
        description: 'Includes direct children of the page, as defined in the `ChildrenResponse` object.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}',
    query: {
      'body-format': 'body_format',
      'get-draft': 'get_draft',
      status: 'status',
      version: 'version',
      'include-labels': 'include_labels',
      'include-properties': 'include_properties',
      'include-operations': 'include_operations',
      'include-likes': 'include_likes',
      'include-versions': 'include_versions',
      'include-version': 'include_version',
      'include-favorited-by-current-user-status': 'include_favorited_by_current_user_status',
      'include-webresources': 'include_webresources',
      'include-collaborators': 'include_collaborators',
      'include-direct-children': 'include_direct_children',
    },
  },
});
