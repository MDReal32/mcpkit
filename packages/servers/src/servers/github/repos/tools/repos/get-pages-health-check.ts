import { defineTool } from '@usemcpkit/core';

export const reposGetPagesHealthCheck = defineTool({
  name: 'repos:get_pages_health_check',
  description:
    "Get a DNS health check for GitHub Pages. Gets a health check of the DNS settings for the `CNAME` record configured for a repository's GitHub Pages.",
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/pages/health',
  },
});
