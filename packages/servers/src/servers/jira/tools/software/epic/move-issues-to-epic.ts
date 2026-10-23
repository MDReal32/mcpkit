import { defineTool } from '@usemcpkit/core';

export const softwareEpicMoveIssuesToEpic = defineTool({
  name: 'software:epic:move_issues_to_epic',
  description:
    'Move issues to epic. Moves issues to an epic, for a given epic id. Issues can be only in a single epic at the same time. That means that already assigned issues to an epic, will not be assigned to the previous epic anymore. The user needs to have the edit issue permission for all issue they want to move and to the epic. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation do…',
  input: {
    type: 'object',
    properties: {
      epicIdOrKey: {
        type: 'string',
        description: 'The id or key of the epic that you want to assign issues to.',
      },
      issues: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['epicIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/agile/1.0/epic/{epicIdOrKey}/issue',
    body: ['issues'],
  },
});
