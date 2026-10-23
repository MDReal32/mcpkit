import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryGetRegistryRepositories = defineTool({
  name: 'packages:container_registry:get_registry_repositories',
  description:
    'Retrieve details of a container registry repository. Retrieves details of a specified container registry repository.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID of the repository.',
      },
      tags: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes an array of `tags` in the response.',
      },
      tags_count: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes `tags_count` in the response.',
      },
      size: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, response includes the deduplicated size of all images in the repository. Only available on GitLab.com for repositories created after `2021-11-04`.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/registry/repositories/{id}',
    query: ['tags', 'tags_count', 'size'],
  },
});
