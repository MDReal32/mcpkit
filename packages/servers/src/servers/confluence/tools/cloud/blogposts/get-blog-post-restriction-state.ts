import { defineTool } from '@usemcpkit/core';

export const cloudBlogpostsGetBlogPostRestrictionState = defineTool({
  name: 'cloud:blogposts:get_blog_post_restriction_state',
  description: '[Cloud] Get blog post restriction state. Returns the restriction state of a blog post.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the blog post.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/blogposts/{id}/restriction-state',
  },
});
