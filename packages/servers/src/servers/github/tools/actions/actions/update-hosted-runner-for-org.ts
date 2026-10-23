import { defineTool } from '@usemcpkit/core';

export const actionsActionsUpdateHostedRunnerForOrg = defineTool({
  name: 'actions:actions:update_hosted_runner_for_org',
  description:
    'Update a GitHub-hosted runner for an organization. Updates a GitHub-hosted runner for an organization. OAuth app tokens and personal access tokens (classic) need the `manage_runners:org` scope to use this endpoint.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      hosted_runner_id: {
        type: 'integer',
        description: 'Unique identifier of the GitHub-hosted runner.',
      },
      name: {
        type: 'string',
        description:
          "Name of the runner. Must be between 1 and 64 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'.",
      },
      runner_group_id: {
        type: 'integer',
        description: 'The existing runner group to add this runner to.',
      },
      maximum_runners: {
        type: 'integer',
        description:
          'The maximum amount of runners to scale up to. Runners will not auto-scale above this number. Use this setting to limit your cost.',
      },
      enable_static_ip: {
        type: 'boolean',
        description:
          'Whether this runner should be updated with a static public IP. Note limit on account. To list limits on account, use `GET actions/hosted-runners/limits`',
      },
      size: {
        type: 'string',
        description:
          'The machine size of the runner. To list available sizes, use `GET actions/hosted-runners/machine-sizes`',
      },
      image_source: {
        type: 'string',
        description:
          'The source type of the runner image to use. Must match the source of the image specified by `image_id`. Can be one of `github`, `partner`, or `custom`.',
        enum: ['github', 'partner', 'custom'],
      },
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the runner image. To list available images, use `GET /actions/hosted-runners/images/github-owned`, `GET /actions/hosted-runners/images/partner`, or `GET /actions/hosted-runners/images/custom`.',
      },
      image_version: {
        type: 'string',
        description:
          'The version of the runner image to deploy. This is relevant only for runners using custom images.',
      },
      image_gen: {
        type: 'boolean',
        description:
          'Whether to enable image generation for this runner pool. When enabled, the runner pool is used to build and publish custom runner images.',
      },
    },
    required: ['org', 'hosted_runner_id'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/actions/hosted-runners/{hosted_runner_id}',
    body: [
      'name',
      'runner_group_id',
      'maximum_runners',
      'enable_static_ip',
      'size',
      'image_source',
      'image_id',
      'image_version',
      'image_gen',
    ],
  },
});
