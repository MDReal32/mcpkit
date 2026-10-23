import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesGetProjectsRepositoryBlobs = defineTool({
  name: 'projects:repositories:get_projects_repository_blobs',
  description:
    'Retrieve a blob from a repository. Retrieves information, such as size and content, about blobs in a repository. Blob content is Base64 encoded. This endpoint can be accessed without authentication, if the repository is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sha: {
        type: 'string',
        description: 'SHA of the blob.',
      },
    },
    required: ['id', 'sha'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/blobs/{sha}',
  },
});
