import { defineTool } from '@usemcpkit/core';

export const reposCreateDeploymentStatus = defineTool({
  name: 'repos:create_deployment_status',
  description:
    'Create a deployment status. Users with `push` access can create deployment statuses for a given deployment.',
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
      deployment_id: {
        type: 'integer',
        description: 'deployment_id parameter',
      },
      state: {
        type: 'string',
        description:
          'The state of the status. When you set a transient deployment to `inactive`, the deployment will be shown as `destroyed` in GitHub.',
        enum: ['error', 'failure', 'inactive', 'in_progress', 'queued', 'pending', 'success'],
      },
      target_url: {
        type: 'string',
        description:
          'The target URL to associate with this status. This URL should contain output to keep the user updated while the task is running or serve as historical information for what happened in the deployment.',
        default: '',
      },
      log_url: {
        type: 'string',
        description:
          'The full URL of the deployment\'s output. This parameter replaces `target_url`. We will continue to accept `target_url` to support legacy uses, but we recommend replacing `target_url` with `log_url`. Setting `log_url` will automatically set `target_url` to the same value. Default: `""`',
        default: '',
      },
      description: {
        type: 'string',
        description: 'A short description of the status. The maximum description length is 140 characters.',
        default: '',
      },
      environment: {
        type: 'string',
        description:
          'Name for the target deployment environment, which can be changed when setting a deploy status. For example, `production`, `staging`, or `qa`. If not defined, the environment of the previous status on the deployment will be used, if it exists. Otherwise, the environment of the deployment will be used.',
      },
      environment_url: {
        type: 'string',
        description: 'Sets the URL for accessing your environment. Default: `""`',
        default: '',
      },
      auto_inactive: {
        type: 'boolean',
        description:
          "Adds a new `inactive` status to all prior non-transient, non-production environment deployments with the same repository and `environment` name as the created status's deployment. An `inactive` status is only added to deployments that had a `success` state. Default: `true`",
      },
    },
    required: ['owner', 'repo', 'deployment_id', 'state'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
    body: ['state', 'target_url', 'log_url', 'description', 'environment', 'environment_url', 'auto_inactive'],
  },
});
