import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsImportProjectMembers = defineTool({
  name: 'projects:projects:create_projects_import_project_members',
  description:
    'Import members. Imports members from another project. If the role of the importing member for the target project is a Maintainer, then members with the Owner role for the source project are imported with the Maintainer role. If the importing member is an Owner, then members with the Owner role for the source project are imported with the Owner role.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      project_id: {
        type: 'integer',
        description: 'ID of the source project to import the members from.',
      },
    },
    required: ['id', 'project_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/import_project_members/{project_id}',
  },
});
