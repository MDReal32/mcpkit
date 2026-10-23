import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsCreateProjectsClusterAgentsUrlConfigurations = defineTool({
  name: 'ci:cluster_agents:create_projects_cluster_agents_url_configurations',
  description:
    'Create an agent URL configuration. Creates an agent URL configuration. You must have the Maintainer or Owner role to use this endpoint. An agent can have only one URL configuration at the time. This feature was introduced in GitLab 17.4.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      agent_id: {
        type: 'integer',
        description: 'ID of the agent.',
      },
      url: {
        type: 'string',
        description: 'Agent URL for this URL configuration.',
      },
      client_cert: {
        type: 'string',
        description:
          'Client certificate in PEM format, used for mTLS authentication. Must be provided with `client_key`.',
      },
      client_key: {
        type: 'string',
        description: 'Client key in PEM format, used for mTLS authentication. Must be provided with `client_cert`.',
      },
      ca_cert: {
        type: 'string',
        description: 'CA certificate in PEM format used to verify the agent endpoint.',
      },
      tls_host: {
        type: 'string',
        description: 'TLS host name to verify the server name in the agent endpoint.',
      },
    },
    required: ['id', 'agent_id', 'url'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/cluster_agents/{agent_id}/url_configurations',
    body: ['url', 'client_cert', 'client_key', 'ca_cert', 'tls_host'],
  },
});
