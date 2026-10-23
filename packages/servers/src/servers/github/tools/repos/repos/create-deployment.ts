import { defineTool } from '@usemcpkit/core';

export const reposReposCreateDeployment = defineTool({
  name: 'repos:repos:create_deployment',
  description: 'Create a deployment. Deployments offer a few configurable parameters with certain defaults.',
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
      ref: {
        type: 'string',
        description: 'The ref to deploy. This can be a branch, tag, or SHA.',
      },
      task: {
        type: 'string',
        description: 'Specifies a task to execute (e.g., `deploy` or `deploy:migrations`).',
        default: 'deploy',
      },
      auto_merge: {
        type: 'boolean',
        description:
          "Attempts to automatically merge the default branch into the requested ref, if it's behind the default branch.",
        default: true,
      },
      required_contexts: {
        type: 'array',
        description:
          'The status contexts to verify against commit status checks. If you omit this parameter, GitHub verifies all unique contexts before creating a deployment. To bypass checking entirely, pass an empty array. Defaults to all unique contexts.',
        items: {
          type: 'string',
        },
      },
      payload: {
        type: 'object',
      },
      environment: {
        type: 'string',
        description: 'Name for the target deployment environment (e.g., `production`, `staging`, `qa`).',
        default: 'production',
      },
      description: {
        type: 'string',
        description: 'Short description of the deployment.',
        default: '',
      },
      transient_environment: {
        type: 'boolean',
        description:
          'Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future. Default: `false`',
        default: false,
      },
      production_environment: {
        type: 'boolean',
        description:
          'Specifies if the given environment is one that end-users directly interact with. Default: `true` when `environment` is `production` and `false` otherwise.',
      },
    },
    required: ['owner', 'repo', 'ref'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/deployments',
    body: [
      'ref',
      'task',
      'auto_merge',
      'required_contexts',
      'payload',
      'environment',
      'description',
      'transient_environment',
      'production_environment',
    ],
  },
});
