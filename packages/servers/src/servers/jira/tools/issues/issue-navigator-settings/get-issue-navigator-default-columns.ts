import { defineTool } from '@usemcpkit/core';

export const issuesIssueNavigatorSettingsGetIssueNavigatorDefaultColumns = defineTool({
  name: 'issues:issue_navigator_settings:get_issue_navigator_default_columns',
  description: 'Get issue navigator default columns. Returns the default issue navigator columns.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/settings/columns',
  },
});
