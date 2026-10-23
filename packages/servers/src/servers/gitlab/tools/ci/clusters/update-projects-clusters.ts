import { defineTool } from '@usemcpkit/core';

export const ciClustersUpdateProjectsClusters = defineTool({
  name: 'ci:clusters:update_projects_clusters',
  description: 'Update a cluster in a project. Updates a cluster in a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      cluster_id: {
        type: 'integer',
        description: 'ID of the cluster.',
      },
      name: {
        type: 'string',
        description: 'Name of the cluster.',
      },
      domain: {
        type: 'string',
        description: 'Base domain of the cluster.',
      },
      environment_scope: {
        type: 'string',
        description: 'Associated environment to the cluster. Premium and Ultimate only.',
      },
      namespace_per_environment: {
        type: 'boolean',
        description: 'If `true`, deploys each environment to a separate Kubernetes namespace.',
        default: true,
      },
      management_project_id: {
        type: 'integer',
        description: 'ID of the management project for the cluster.',
      },
      enabled: {
        type: 'boolean',
        description: "If `true`, the cluster is active and GitLab's connection to the Kubernetes cluster is enabled.",
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
            description:
              'Kubernetes namespace that environments deploy to. If `managed` and `namespace_per_environment` are `true`, the environment slug is appended.',
          },
        },
      },
    },
    required: ['id', 'cluster_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/clusters/{cluster_id}',
    body: [
      'name',
      'domain',
      'environment_scope',
      'namespace_per_environment',
      'management_project_id',
      'enabled',
      'managed',
      'platform_kubernetes_attributes',
    ],
  },
});
