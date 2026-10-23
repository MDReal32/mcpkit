import { defineTool } from '@usemcpkit/core';

export const usersUsersCreateUserRunners = defineTool({
  name: 'users:users:create_user_runners',
  description: 'Create a runner owned by currently authenticated user. Create a new runner',
  input: {
    type: 'object',
    properties: {
      runner_type: {
        type: 'string',
        description: 'Scope of the runner.',
        enum: ['instance_type', 'group_type', 'project_type'],
      },
      group_id: {
        type: 'integer',
        description: 'ID of the group to create the runner in. Required if `runner_type` is `group_type`.',
      },
      project_id: {
        type: 'integer',
        description: 'ID of the project to create the runner in. Required if `runner_type` is `project_type`.',
      },
      description: {
        type: 'string',
        description: 'Description of the runner.',
      },
      maintenance_note: {
        type: 'string',
        description: 'Free-form maintenance notes for the runner. Limited to 1024 characters.',
      },
      paused: {
        type: 'boolean',
        description: 'If `true`, the runner ignores new jobs.',
      },
      locked: {
        type: 'boolean',
        description: 'Specifies if the runner should be locked for the current project.',
        default: false,
      },
      access_level: {
        type: 'string',
        description: 'Access level of the runner.',
        enum: ['not_protected', 'ref_protected'],
      },
      run_untagged: {
        type: 'boolean',
        description: 'Specifies if the runner should handle untagged jobs.',
        default: true,
      },
      tag_list: {
        type: 'array',
        description: 'Comma-separated list of runner tags.',
        items: {
          type: 'string',
        },
      },
      maximum_timeout: {
        type: 'integer',
        description: 'Maximum time, in seconds, that runners can spend running a job.',
      },
      token_expires_at: {
        type: 'string',
        description:
          'Expiration time for the runner authentication token in ISO 8601 format. Must be between 5 minutes and 21 days in the future and cannot exceed instance, group, or project-level limits. Only applies to the initial token. Rotated tokens use the computed expiry from settings. Premium and Ultimate only.',
      },
      token_rotation_deadline: {
        type: 'string',
        description:
          'Deadline after which token rotation requests are rejected. Requires `token_expires_at` and must be less than or equal to it. Setting both to the same value disables token rotation. Cleared on successful rotation. Premium and Ultimate only.',
      },
    },
    required: ['runner_type', 'group_id', 'project_id'],
  },
  request: {
    method: 'POST',
    path: '/user/runners',
    body: [
      'runner_type',
      'group_id',
      'project_id',
      'description',
      'maintenance_note',
      'paused',
      'locked',
      'access_level',
      'run_untagged',
      'tag_list',
      'maximum_timeout',
      'token_expires_at',
      'token_rotation_deadline',
    ],
  },
});
