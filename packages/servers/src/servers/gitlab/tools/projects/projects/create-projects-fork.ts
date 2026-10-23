import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsFork = defineTool({
  name: 'projects:projects:create_projects_fork',
  description: 'Create a fork of a project. Creates a fork of a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      namespace: {
        type: 'string',
        description:
          'ID or path of the namespace to fork the new project into. Deprecated. Use `namespace_id` or `namespace_path` instead.',
      },
      namespace_id: {
        type: 'integer',
        description: 'ID of the namespace to fork the new project into.',
      },
      namespace_path: {
        type: 'string',
        description: 'Path of the namespace to fork the new project into.',
      },
      path: {
        type: 'string',
        description: 'Path assigned to the new project after forking.',
      },
      name: {
        type: 'string',
        description: 'Name assigned to the new project after forking.',
      },
      description: {
        type: 'string',
        description: 'Description assigned to the new project after forking.',
      },
      visibility: {
        type: 'string',
        description: 'Visibility level assigned to the new project after forking.',
        enum: ['private', 'internal', 'public'],
      },
      mr_default_target_self: {
        type: 'boolean',
        description:
          'If `true`, merge requests from the forked project target this project. If `false`, they target the upstream project.',
      },
      branches: {
        type: 'string',
        description: 'Branches to fork. Leave empty to fork all branches.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/fork',
    body: [
      'namespace',
      'namespace_id',
      'namespace_path',
      'path',
      'name',
      'description',
      'visibility',
      'mr_default_target_self',
      'branches',
    ],
  },
});
