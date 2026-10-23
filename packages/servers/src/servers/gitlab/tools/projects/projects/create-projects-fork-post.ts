import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsForkPost = defineTool({
  name: 'projects:projects:create_projects_fork_post',
  description: 'Create a fork relationship. Creates a fork relationship between a project and an upstream project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      forked_from_id: {
        type: 'string',
        description: 'ID of the project that was forked from.',
      },
    },
    required: ['id', 'forked_from_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/fork/{forked_from_id}',
  },
});
