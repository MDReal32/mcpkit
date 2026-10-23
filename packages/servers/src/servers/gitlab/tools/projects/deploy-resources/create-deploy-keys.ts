import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesCreateDeployKeys = defineTool({
  name: 'projects:deploy_resources:create_deploy_keys',
  description: 'Create a deploy key. Creates a deploy key for the GitLab instance. Requires administrator access.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Public key value of the deploy key.',
      },
      title: {
        type: 'string',
        description: 'Title of the deploy key.',
      },
      expires_at: {
        type: 'string',
        description: 'Date when the deploy key expires. If omitted, the deploy key does not expire.',
      },
    },
    required: ['key', 'title'],
  },
  request: {
    method: 'POST',
    path: '/deploy_keys',
    body: ['key', 'title', 'expires_at'],
  },
});
