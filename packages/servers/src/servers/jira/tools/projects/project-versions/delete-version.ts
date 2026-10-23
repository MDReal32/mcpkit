import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsDeleteVersion = defineTool({
  name: 'projects:project_versions:delete_version',
  description: '[Deprecated] Delete version. Deletes a project version.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version.',
      },
      moveFixIssuesTo: {
        type: 'string',
        description:
          'The ID of the version to update `fixVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted.',
      },
      moveAffectedIssuesTo: {
        type: 'string',
        description:
          'The ID of the version to update `affectedVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/version/{id}',
    query: ['moveFixIssuesTo', 'moveAffectedIssuesTo'],
  },
});
