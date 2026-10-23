import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsUploads = defineTool({
  name: 'projects:projects:delete_projects_uploads',
  description:
    'Delete an uploaded file by ID. Deletes an uploaded file with a specified ID. You must have the Maintainer or Owner role for the project.',
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
    method: 'DELETE',
    path: '/projects/{id}/uploads/{upload_id}',
  },
});
