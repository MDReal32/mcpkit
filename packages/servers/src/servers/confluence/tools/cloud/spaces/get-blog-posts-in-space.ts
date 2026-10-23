import { defineTool } from '@usemcpkit/core';

export const cloudSpacesGetBlogPostsInSpace = defineTool({
  name: 'cloud:spaces:get_blog_posts_in_space',
  description:
    '[Cloud] Get blog posts in space. Returns all blog posts in a space. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the space for which blog posts should be returned.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['id', '-id', 'created-date', '-created-date', 'modified-date', '-modified-date'],
      },
      status: {
        type: 'string',
        description:
          'Filter the results to blog posts based on their status. By default, `current` is used. (comma-separated)',
      },
      title: {
        type: 'string',
        description: 'Filter the results to blog posts based on their title.',
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format'],
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of blog posts per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/spaces/{id}/blogposts',
    query: {
      sort: 'sort',
      status: 'status',
      title: 'title',
      'body-format': 'body_format',
      cursor: 'cursor',
      limit: 'limit',
    },
  },
});
