import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesCreateProjectsDeployKeys = defineTool({
  name: 'projects:deploy_resources:create_projects_deploy_keys',
  description:
    'Add a deploy key for a project. Adds a deploy key for a specified project. If the deploy key already exists in another project, it is joined to the current project only if the original one is accessible by the same user.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key: {
        type: 'string',
        description: 'Public key value of the deploy key.',
      },
      title: {
        type: 'string',
        description: 'Title of the deploy key.',
      },
      can_push: {
        type: 'boolean',
        description: "If `true`, the deploy key can push to the project's repository.",
      },
      expires_at: {
        type: 'string',
        description: 'Date when the deploy key expires. If omitted, the deploy key does not expire.',
      },
    },
    required: ['id', 'key', 'title'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/deploy_keys',
    body: ['key', 'title', 'can_push', 'expires_at'],
  },
});
