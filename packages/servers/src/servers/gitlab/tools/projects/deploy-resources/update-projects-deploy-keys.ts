import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesUpdateProjectsDeployKeys = defineTool({
  name: 'projects:deploy_resources:update_projects_deploy_keys',
  description: 'Update a deploy key. Updates a deploy key for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key_id: {
        type: 'integer',
        description: 'ID of the deploy key.',
      },
      title: {
        type: 'string',
        description: 'Title of the deploy key. At least one of `title`, `can_push` must be provided.',
      },
      can_push: {
        type: 'boolean',
        description:
          "If `true`, the deploy key can push to the project's repository. At least one of `title`, `can_push` must be provided.",
      },
    },
    required: ['id', 'key_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/deploy_keys/{key_id}',
    body: ['title', 'can_push'],
  },
});
