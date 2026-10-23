import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportCreateProjectsImportRelationAuthorize = defineTool({
  name: 'projects:project_import:create_projects_import_relation_authorize',
  description:
    'Authorize project relation import. Authorizes uploading a project relation import file. This feature was introduced in GitLab 16.11.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/projects/import-relation/authorize',
  },
});
