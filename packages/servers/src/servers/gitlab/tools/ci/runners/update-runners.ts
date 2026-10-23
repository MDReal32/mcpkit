import { defineTool } from '@usemcpkit/core';

export const ciRunnersUpdateRunners = defineTool({
  name: 'ci:runners:update_runners',
  description: 'Update a runner. Updates a specified runner.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the runner.',
      },
      description: {
        type: 'string',
        description:
          'Description of the runner. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      active: {
        type: 'boolean',
        description:
          'If `true`, the runner is allowed to receive jobs. Deprecated. Use `paused` instead. Mutually exclusive with `paused`. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      paused: {
        type: 'boolean',
        description:
          'If `true`, the runner ignores new jobs. Mutually exclusive with `active`. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      tag_list: {
        type: 'array',
        description:
          'List of tags for the runner. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
        items: {
          type: 'string',
        },
      },
      run_untagged: {
        type: 'boolean',
        description:
          'If `true`, the runner can execute untagged jobs. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      locked: {
        type: 'boolean',
        description:
          'If `true`, the runner is locked. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      access_level: {
        type: 'string',
        description:
          'Access level of the runner. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
        enum: ['not_protected', 'ref_protected'],
      },
      maximum_timeout: {
        type: 'integer',
        description:
          'Maximum time, in seconds, that runners can spend running a job. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
      maintenance_note: {
        type: 'string',
        description:
          'Free-form maintenance notes for the runner. Limited to 1024 characters. At least one of `description`, `active`, `paused`, `tag_list`, `run_untagged`, `locked`, `access_level`, `maximum_timeout`, `maintenance_note` must be provided.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/runners/{id}',
    body: [
      'description',
      'active',
      'paused',
      'tag_list',
      'run_untagged',
      'locked',
      'access_level',
      'maximum_timeout',
      'maintenance_note',
    ],
  },
});
