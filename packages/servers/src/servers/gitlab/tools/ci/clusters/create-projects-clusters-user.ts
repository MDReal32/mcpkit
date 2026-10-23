import { defineTool } from '@usemcpkit/core';

export const ciClustersCreateProjectsClustersUser = defineTool({
  name: 'ci:clusters:create_projects_clusters_user',
  description: 'Add a cluster to a project. Adds a cluster to a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the cluster.',
      },
      enabled: {
        type: 'boolean',
        description: "If `true`, the cluster is active and GitLab's connection to the Kubernetes cluster is enabled.",
        default: true,
      },
      domain: {
        type: 'string',
        description: 'Base domain of the cluster.',
      },
      environment_scope: {
        type: 'string',
        description: 'Associated environment to the cluster. Premium and Ultimate only.',
        default: '*',
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
      managed: {
        type: 'boolean',
        description: 'If `true`, GitLab manages namespaces and service accounts for this cluster.',
        default: true,
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
          authorization_type: {
            type: 'string',
            description: 'Cluster authorization type.',
            default: 'rbac',
            enum: ['unknown_authorization', 'rbac', 'abac'],
          },
        },
        required: ['api_url', 'token'],
      },
    },
    required: ['id', 'name', 'platform_kubernetes_attributes'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/clusters/user',
    body: [
      'name',
      'enabled',
      'domain',
      'environment_scope',
      'namespace_per_environment',
      'management_project_id',
      'managed',
      'platform_kubernetes_attributes',
    ],
  },
});
