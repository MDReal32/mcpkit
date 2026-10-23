import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryGetProjectsRegistryRepositoriesTags = defineTool({
  name: 'packages:container_registry:get_projects_registry_repositories_tags',
  description:
    'Retrieve details of a registry repository tag. Retrieves details of a specified registry repository tag.',
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
    method: 'GET',
    path: '/projects/{id}/registry/repositories/{repository_id}/tags/{tag_name}',
  },
});
