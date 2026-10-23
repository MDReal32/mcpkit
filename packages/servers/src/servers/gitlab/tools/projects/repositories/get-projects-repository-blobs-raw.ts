import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesGetProjectsRepositoryBlobsRaw = defineTool({
  name: 'projects:repositories:get_projects_repository_blobs_raw',
  description:
    'Retrieve raw blob content. Retrieves the raw file contents for a blob, by blob SHA. This endpoint can be accessed without authentication if the repository is publicly accessible.',
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
    path: '/projects/{id}/repository/blobs/{sha}/raw',
  },
});
