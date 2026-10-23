import { defineTool } from '@usemcpkit/core';

export const ciClustersCreateGroupsClustersUser = defineTool({
  name: 'ci:clusters:create_groups_clusters_user',
  description:
    'Create a group cluster. Creates a group cluster for a specified group by adding an existing Kubernetes cluster.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
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
            description: 'Kubernetes namespace that environments deploy to. Allowed only when `managed` is `false`.',
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
    path: '/groups/{id}/clusters/user',
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
