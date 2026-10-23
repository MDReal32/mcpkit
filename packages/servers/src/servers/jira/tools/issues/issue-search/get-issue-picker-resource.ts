import { defineTool } from '@usemcpkit/core';

export const issuesIssueSearchGetIssuePickerResource = defineTool({
  name: 'issues:issue_search:get_issue_picker_resource',
  description:
    'Get issue picker suggestions. Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the user is looking for an issue using a word or string.',
  input: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'A string to match against text fields in the issue such as title, description, or comments.',
      },
      currentJQL: {
        type: 'string',
        description:
          'A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead.',
      },
      currentIssueKey: {
        type: 'string',
        description:
          'The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query.',
      },
      currentProjectId: {
        type: 'string',
        description: 'The ID of a project that suggested issues must belong to.',
      },
      showSubTasks: {
        type: 'boolean',
        description: 'Indicate whether to include subtasks in the suggestions list.',
      },
      showSubTaskParent: {
        type: 'boolean',
        description:
          'When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/picker',
    query: ['query', 'currentJQL', 'currentIssueKey', 'currentProjectId', 'showSubTasks', 'showSubTaskParent'],
  },
});
