import { defineTool } from '@usemcpkit/core';

export const ciClustersUpdateAdminClusters = defineTool({
  name: 'ci:clusters:update_admin_clusters',
  description: 'Update an instance cluster. Updates an existing instance cluster.',
  input: {
    type: 'object',
    properties: {
      cluster_id: {
        type: 'integer',
        description: 'ID of the cluster.',
      },
      name: {
        type: 'string',
        description: 'Name of the cluster.',
      },
      enabled: {
        type: 'boolean',
        description: "If `true`, the cluster is active and GitLab's connection to the Kubernetes cluster is enabled.",
      },
      environment_scope: {
        type: 'string',
        description: 'Associated environment to the cluster.',
      },
      namespace_per_environment: {
        type: 'boolean',
        description: 'If `true`, deploys each environment to a separate Kubernetes namespace.',
        default: true,
      },
      domain: {
        type: 'string',
        description: 'Base domain of the cluster.',
      },
      management_project_id: {
        type: 'integer',
        description: 'ID of the management project for the cluster.',
      },
      managed: {
        type: 'boolean',
        description: 'If `true`, GitLab manages namespaces and service accounts for this cluster.',
      },
      platform_kubernetes_attributes: {
        type: 'object',
        description: 'Platform Kubernetes data.',
        properties: {
          api_url: {
            type: 'string',
            description: 'URL to access the Kubernetes API.',
          },
          token: {
            type: 'string',
            description: 'Token to authenticate against Kubernetes.',
          },
          ca_cert: {
            type: 'string',
            description: 'TLS certificate (needed if API is using a self-signed TLS certificate).',
          },
          namespace: {
            type: 'string',
            description: 'Kubernetes namespace that environments deploy to. Allowed only when `managed` is `false`.',
          },
        },
      },
    },
    required: ['cluster_id'],
  },
  request: {
    method: 'PUT',
    path: '/admin/clusters/{cluster_id}',
    body: [
      'name',
      'enabled',
      'environment_scope',
      'namespace_per_environment',
      'domain',
      'management_project_id',
      'managed',
      'platform_kubernetes_attributes',
    ],
  },
});
