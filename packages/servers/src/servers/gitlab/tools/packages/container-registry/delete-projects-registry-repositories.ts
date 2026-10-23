import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryDeleteProjectsRegistryRepositories = defineTool({
  name: 'packages:container_registry:delete_projects_registry_repositories',
  description:
    'Delete registry repository. Deletes a specified repository in the registry. This operation is executed asynchronously and might take some time to execute.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      repository_id: {
        type: 'integer',
        description: 'ID of the container registry repository.',
      },
    },
    required: ['id', 'repository_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/registry/repositories/{repository_id}',
  },
});
