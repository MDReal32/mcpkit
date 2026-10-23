import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsMergeVersions = defineTool({
  name: 'projects:project_versions:merge_versions',
  description:
    'Merge versions. Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version to delete.',
      },
      moveIssuesTo: {
        type: 'string',
        description: 'The ID of the version to merge into.',
      },
    },
    required: ['id', 'moveIssuesTo'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/version/{id}/mergeto/{moveIssuesTo}',
  },
});
