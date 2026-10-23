import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsGetVersionUnresolvedIssues = defineTool({
  name: 'projects:project_versions:get_version_unresolved_issues',
  description:
    "Get version's unresolved issues count. Returns counts of the issues and unresolved issues for the project version.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/version/{id}/unresolvedIssueCount',
  },
});
