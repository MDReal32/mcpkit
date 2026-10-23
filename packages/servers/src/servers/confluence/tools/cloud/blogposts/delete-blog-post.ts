import { defineTool } from '@usemcpkit/core';

export const cloudBlogpostsDeleteBlogPost = defineTool({
  name: 'cloud:blogposts:delete_blog_post',
  description: '[Cloud] Delete blog post. Delete a blog post by id.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the blog post to be deleted.',
      },
      purge: {
        type: 'boolean',
        description: 'If attempting to purge the blog post.',
      },
      draft: {
        type: 'boolean',
        description: 'If attempting to delete a blog post that is a draft.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/blogposts/{id}',
    query: ['purge', 'draft'],
  },
});
