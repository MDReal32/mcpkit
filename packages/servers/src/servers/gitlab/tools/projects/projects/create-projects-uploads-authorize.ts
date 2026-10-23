import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsUploadsAuthorize = defineTool({
  name: 'projects:projects:create_projects_uploads_authorize',
  description: 'Workhorse authorize the file upload. This feature was introduced in GitLab 13.11',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/uploads/authorize',
  },
});
