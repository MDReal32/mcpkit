import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportCreateProjectsImportAuthorize = defineTool({
  name: 'projects:project_import:create_projects_import_authorize',
  description: 'Workhorse authorize the project import upload. This feature was introduced in GitLab 12.9',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/projects/import/authorize',
  },
});
