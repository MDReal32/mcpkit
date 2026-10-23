import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsDeleteRelatedWork = defineTool({
  name: 'projects:project_versions:delete_related_work',
  description: 'Delete related work. Deletes the given related work for the given version.',
  input: {
    type: 'object',
    properties: {
      versionId: {
        type: 'string',
        description: 'The ID of the version that the target related work belongs to.',
      },
      relatedWorkId: {
        type: 'string',
        description: 'The ID of the related work to delete.',
      },
    },
    required: ['versionId', 'relatedWorkId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/version/{versionId}/relatedwork/{relatedWorkId}',
  },
});
