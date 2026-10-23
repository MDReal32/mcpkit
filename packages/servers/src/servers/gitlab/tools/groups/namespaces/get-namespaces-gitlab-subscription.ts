import { defineTool } from '@usemcpkit/core';

export const groupsNamespacesGetNamespacesGitlabSubscription = defineTool({
  name: 'groups:namespaces:get_namespaces_gitlab_subscription',
  description: 'Retrieve namespace subscription. Retrieves GitLab subscription details for a specified namespace.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the namespace.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/namespaces/{id}/gitlab_subscription',
  },
});
