import { defineTool } from '@usemcpkit/core';

export const projectsProjectImportGetProjectsRelationImports = defineTool({
  name: 'projects:project_import:get_projects_relation_imports',
  description:
    'Retrieve the status of a project resource import. Retrieves the status of the most recent relation import for a specified project. Because only one relation import can be scheduled at a time, you can use this endpoint to check whether the previous import completed successfully. This feature was introduced in GitLab 16.11.',
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
    method: 'GET',
    path: '/projects/{id}/relation-imports',
  },
});
