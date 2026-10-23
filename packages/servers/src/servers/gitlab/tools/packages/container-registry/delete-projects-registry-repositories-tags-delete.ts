import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryDeleteProjectsRegistryRepositoriesTagsDelete = defineTool({
  name: 'packages:container_registry:delete_projects_registry_repositories_tags_delete',
  description: 'Delete a registry repository tag. Deletes a specified container registry repository tag.',
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
      tag_name: {
        type: 'string',
        description: 'Name of the tag.',
      },
    },
    required: ['id', 'repository_id', 'tag_name'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/registry/repositories/{repository_id}/tags/{tag_name}',
  },
});
