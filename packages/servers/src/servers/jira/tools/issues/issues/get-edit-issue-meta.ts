import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetEditIssueMeta = defineTool({
  name: 'issues:issues:get_edit_issue_meta',
  description:
    'Get edit issue metadata. Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in Edit issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      overrideScreenSecurity: {
        type: 'boolean',
        default: false,
        description:
          'Whether hidden fields are returned. Available to Connect and Forge app users with *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
      overrideEditableFlag: {
        type: 'boolean',
        default: false,
        description:
          'Whether non-editable fields are returned. Available to Connect and Forge app users with *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/editmeta',
    query: ['overrideScreenSecurity', 'overrideEditableFlag'],
  },
});
