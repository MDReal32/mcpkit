import { defineTool } from '@usemcpkit/core';

export const cloudBlogpostsGetBlogPostClassificationLevel = defineTool({
  name: 'cloud:blogposts:get_blog_post_classification_level',
  description: '[Cloud] Get blog post classification level. Returns the classification level for a specific blog post.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the blog post for which classification level should be returned.',
      },
      status: {
        type: 'string',
        enum: ['current', 'draft', 'archived'],
        description: 'Status of blog post from which classification level will fetched.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/blogposts/{id}/classification-level',
    query: ['status'],
  },
});
