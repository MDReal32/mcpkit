import { defineTool } from '@usemcpkit/core';

export const issuesCreate = defineTool({
  name: 'issues:create',
  description:
    'Create an issue. Any user with pull access to a repository can create an issue. If issues are disabled in the repository, the API returns a `410 Gone` status.',
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
      title: {
        description: 'The title of the issue.',
      },
      body: {
        type: 'string',
        description: 'The contents of the issue.',
      },
      assignee: {
        type: 'string',
        description:
          'Login for the user that this issue should be assigned to. _NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise. **This field is closing down.**_',
      },
      milestone: {},
      labels: {
        type: 'array',
        description:
          'Labels to associate with this issue. _NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise._',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            color: {
              type: 'string',
            },
          },
        },
      },
      assignees: {
        type: 'array',
        description:
          'Logins for Users to assign to this issue. _NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise._',
        items: {
          type: 'string',
        },
      },
      issue_field_values: {
        type: 'array',
        description:
          'An array of issue field values to set on this issue. Each field value must include the field ID and the value to set. Issue fields are only available for organization-owned repositories with the feature enabled. Field values are silently dropped otherwise.',
        items: {
          type: 'object',
          properties: {
            field_id: {
              type: 'integer',
              description: 'The ID of the issue field to set',
            },
            value: {
              description: 'The value to set for the field. For multi-select fields, provide an array of option names.',
            },
          },
          required: ['field_id', 'value'],
        },
      },
      type: {
        type: 'string',
        description:
          'The name of the issue type to associate with this issue. _NOTE: Only users with push access can set the type for new issues. The type is silently dropped otherwise._',
      },
      parent_issue_id: {
        type: 'integer',
        description:
          "The id of the parent issue to add this issue to as a sub-issue. _NOTE: Only users with triage access to both the parent issue's repository and this repository can set the parent issue._",
      },
    },
    required: ['owner', 'repo', 'title'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/issues',
    body: [
      'title',
      'body',
      'assignee',
      'milestone',
      'labels',
      'assignees',
      'issue_field_values',
      'type',
      'parent_issue_id',
    ],
  },
});
