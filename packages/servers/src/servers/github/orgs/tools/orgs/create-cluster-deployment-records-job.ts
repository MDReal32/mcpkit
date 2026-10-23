import { defineTool } from '@usemcpkit/core';

export const orgsCreateClusterDeploymentRecordsJob = defineTool({
  name: 'orgs:create_cluster_deployment_records_job',
  description:
    'Create a cluster deployment records job. Create a background job to set deployment records for a given cluster. Performs validation and permission checks synchronously, returning rejected deployments immediately, then enqueues a background job for the actual deployment updates. Use the companion GET endpoint to poll for job status.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      cluster: {
        type: 'string',
        description: 'The cluster name.',
      },
      logical_environment: {
        type: 'string',
        description: 'The stage of the deployment.',
      },
      physical_environment: {
        type: 'string',
        description: 'The physical region of the deployment.',
      },
      deployments: {
        type: 'array',
        description: 'The list of deployments to record.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the artifact.',
            },
            digest: {
              type: 'string',
              description: 'The hex encoded digest of the artifact.',
            },
            version: {
              type: 'string',
              description: 'The artifact version.',
            },
            status: {
              type: 'string',
              description: 'The deployment status of the artifact.',
              default: 'deployed',
              enum: ['deployed', 'decommissioned'],
            },
            deployment_name: {
              type: 'string',
              description: 'The unique identifier for the deployment represented by the new record.',
            },
            github_repository: {
              type: 'string',
              description: 'The name of the GitHub repository associated with the artifact.',
            },
            tags: {
              type: 'object',
              description: 'Key-value pairs to tag the deployment record.',
            },
            runtime_risks: {
              type: 'array',
              description: 'A list of runtime risks associated with the deployment.',
              items: {
                type: 'string',
                enum: ['critical-resource', 'internet-exposed', 'lateral-movement', 'sensitive-data'],
              },
            },
          },
          required: ['name', 'deployment_name', 'digest'],
        },
      },
    },
    required: ['org', 'cluster', 'logical_environment', 'deployments'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}/jobs',
    body: ['logical_environment', 'physical_environment', 'deployments'],
  },
});
