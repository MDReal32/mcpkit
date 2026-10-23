import { defineTool } from '@usemcpkit/core';

export const issuesIssuesListProjectsIssuesRelatedMergeRequests = defineTool({
  name: 'issues:issues:list_projects_issues_related_merge_requests',
  description:
    'List all merge requests related to an issue. Lists all merge requests that are related to a specified issue. If the project is private or the issue is confidential, you need to provide credentials to authorize. In most cases, you should authenticate with a personal access token.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'Internal ID of the issue.',
      },
    },
    required: ['id', 'issue_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{issue_iid}/related_merge_requests',
  },
});
