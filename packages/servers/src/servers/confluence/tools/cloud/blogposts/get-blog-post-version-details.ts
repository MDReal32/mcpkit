import { defineTool } from '@usemcpkit/core';

export const cloudBlogpostsGetBlogPostVersionDetails = defineTool({
  name: 'cloud:blogposts:get_blog_post_version_details',
  description:
    '[Cloud] Get version details for blog post version. Retrieves version details for the specified blog post and version number.',
  input: {
    type: 'object',
    properties: {
      blogpost_id: {
        type: 'integer',
        description: 'The ID of the blog post for which version details should be returned.',
      },
      version_number: {
        type: 'integer',
        description: 'The version number of the blog post to be returned.',
      },
    },
    required: ['blogpost_id', 'version_number'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/blogposts/{blogpost_id}/versions/{version_number}',
  },
});
