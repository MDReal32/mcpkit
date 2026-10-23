import { defineTool } from '@usemcpkit/core';

export const projectsWebCommitsGetWebCommitsPublicKey = defineTool({
  name: 'projects:web_commits:get_web_commits_public_key',
  description:
    'Retrieve the public signing key. Retrieves the GitLab public key for signing web commits. This feature was introduced in GitLab 17.4.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/web_commits/public_key',
  },
});
