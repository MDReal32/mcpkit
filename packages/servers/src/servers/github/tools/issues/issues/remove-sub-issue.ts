import { defineTool } from '@usemcpkit/core';

export const issuesIssuesRemoveSubIssue = defineTool({
  name: 'issues:issues:remove_sub_issue',
  description:
    'Remove sub-issue. You can use the REST API to remove a sub-issue from an issue. Removing content too quickly using this endpoint may result in secondary rate limiting. For more information, see "Rate limits for the API" and "Best practices for using the REST API." This endpoint supports the following custom media types. For more information, see "Media types." - **`application/vnd.github.raw+json`**: Returns the r…',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      issue_number: {
        type: 'integer',
        description: 'The number that identifies the issue.',
      },
      sub_issue_id: {
        type: 'integer',
        description: 'The id of the sub-issue to remove',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'sub_issue_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issue',
    body: ['sub_issue_id'],
  },
});
