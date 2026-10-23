import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProjectsUploads = defineTool({
  name: 'projects:projects:get_projects_uploads',
  description:
    'Download an uploaded file by ID. Downloads an uploaded file with a specified ID. You must have the Maintainer or Owner role for the project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      upload_id: {
        type: 'integer',
        description: 'ID of the upload.',
      },
    },
    required: ['id', 'upload_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/uploads/{upload_id}',
  },
});
