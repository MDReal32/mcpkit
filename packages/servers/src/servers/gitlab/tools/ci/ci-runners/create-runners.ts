import { defineTool } from '@usemcpkit/core';

export const ciCiRunnersCreateRunners = defineTool({
  name: 'ci:ci_runners:create_runners',
  description: 'Create a runner. Creates a runner.',
  input: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Registration token.',
      },
      description: {
        type: 'string',
        description: 'Description of the runner.',
      },
      maintainer_note: {
        type: 'string',
        description:
          'Free-form maintenance notes for the runner. Deprecated. Use `maintenance_note` instead. Mutually exclusive with `maintenance_note`.',
      },
      maintenance_note: {
        type: 'string',
        description:
          'Free-form maintenance notes for the runner (1024 characters). Mutually exclusive with `maintainer_note`.',
      },
      info: {
        type: 'object',
        description: "Runner's metadata",
        properties: {
          name: {
            type: 'string',
            description: "Runner's name",
          },
          version: {
            type: 'string',
            description: "Runner's version",
          },
          revision: {
            type: 'string',
            description: "Runner's revision",
          },
          platform: {
            type: 'string',
            description: "Runner's platform",
          },
          architecture: {
            type: 'string',
            description: "Runner's architecture",
          },
        },
      },
      active: {
        type: 'boolean',
        description:
          'If `true`, the runner is allowed to receive new jobs. Deprecated. Use `paused` instead. Mutually exclusive with `paused`.',
      },
      paused: {
        type: 'boolean',
        description: 'If `true`, the runner ignores new jobs. Mutually exclusive with `active`.',
      },
      locked: {
        type: 'boolean',
        description: 'If `true`, the runner is locked for the current project.',
      },
      access_level: {
        type: 'string',
        description: 'Access level of the runner.',
        enum: ['not_protected', 'ref_protected'],
      },
      run_untagged: {
        type: 'boolean',
        description: 'If `true`, the runner handles untagged jobs.',
      },
      tag_list: {
        type: 'array',
        description: 'List of runner tags.',
        items: {
          type: 'string',
        },
      },
      maximum_timeout: {
        type: 'integer',
        description: 'Maximum time, in seconds, that runners can spend running a job.',
      },
    },
    required: ['token'],
  },
  request: {
    method: 'POST',
    path: '/runners',
    body: [
      'token',
      'description',
      'maintainer_note',
      'maintenance_note',
      'info',
      'active',
      'paused',
      'locked',
      'access_level',
      'run_untagged',
      'tag_list',
      'maximum_timeout',
    ],
  },
});
