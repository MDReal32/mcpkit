import { defineTool } from '@usemcpkit/core';

export const issuesIssuesListSuggestions = defineTool({
  name: 'issues:issues:list_suggestions',
  description:
    "List issue suggestions. Lists the suggestions on an issue. A suggestion is an agent-proposed change to an issue's type, labels, fields, assignees, or closed state that a maintainer can approve or dismiss.",
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
      state: {
        type: 'string',
        default: 'pending',
        enum: ['pending', 'applied', 'approved', 'dismissed', 'replaced', 'invalidated', 'all'],
        description: 'Filter suggestions by their state.',
      },
      action: {
        type: 'string',
        enum: ['set_type', 'add_label', 'add_field', 'add_assignee', 'close_issue'],
        description: 'Filter suggestions by the change they propose.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/suggestions',
    query: ['state', 'action', 'per_page', 'page'],
  },
});
