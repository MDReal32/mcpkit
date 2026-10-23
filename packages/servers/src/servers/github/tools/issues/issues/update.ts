import { defineTool } from '@usemcpkit/core';

export const issuesIssuesUpdate = defineTool({
  name: 'issues:issues:update',
  description: 'Update an issue. Issue owners and users with push access or Triage role can edit an issue.',
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
      title: {
        description: 'The title of the issue.',
      },
      body: {
        type: 'string',
        description: 'The contents of the issue.',
      },
      assignee: {
        type: 'string',
        description: 'Username to assign to this issue. **This field is closing down.**',
      },
      state: {
        type: 'string',
        description: 'The open or closed state of the issue.',
        enum: ['open', 'closed'],
      },
      state_reason: {
        type: 'string',
        description: 'The reason for the state change. Ignored unless `state` is changed.',
        enum: ['completed', 'not_planned', 'duplicate', 'reopened'],
      },
      duplicate_issue_id: {
        type: 'integer',
        description:
          'The ID of the issue to mark as the canonical duplicate when `state_reason` is `duplicate`. The issue must exist and be accessible to the authenticated user. Ignored when `state_reason` is not `duplicate`.',
      },
      milestone: {},
      labels: {
        type: 'array',
        description:
          'Labels to associate with this issue. Pass one or more labels to _replace_ the set of labels on this issue. Send an empty array (`[]`) to clear all labels from the issue. Only users with push access can set labels for issues. Without push access to the repository, label changes are silently dropped.',
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
            rationale: {
              type: 'string',
              description: 'Optional reasoning for selecting this label.',
            },
            suggest: {
              type: 'boolean',
              description:
                'If `true`, the change is stored as a pending suggestion for human review rather than applied directly.',
            },
            confidence: {
              type: 'string',
              description: 'The confidence level for this label choice.',
              enum: ['low', 'medium', 'high'],
            },
          },
        },
      },
      assignees: {
        type: 'array',
        description:
          'Usernames to assign to this issue. Pass one or more user logins to _replace_ the set of assignees on this issue. Send an empty array (`[]`) to clear all assignees from the issue. Only users with push access can set assignees for new issues. Without push access to the repository, assignee changes are silently dropped.',
        items: {
          type: 'object',
          properties: {
            login: {
              type: 'string',
            },
            rationale: {
              type: 'string',
              description: 'Optional reasoning for selecting this assignee.',
            },
            suggest: {
              type: 'boolean',
              description:
                'If `true`, the change is stored as a pending suggestion for human review rather than applied directly.',
            },
            confidence: {
              type: 'string',
              description: 'The confidence level for this assignee choice.',
              enum: ['low', 'medium', 'high'],
            },
          },
        },
      },
      issue_field_values: {
        type: 'array',
        description:
          'An array of issue field values to set on this issue. Each field value must include the field ID and the value to set. Only users with push access can set field values for issues',
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
            rationale: {
              type: 'string',
              description: 'Optional reasoning for setting this field value.',
            },
            suggest: {
              type: 'boolean',
              description:
                'If `true`, the change is stored as a pending suggestion for human review rather than applied directly.',
            },
            confidence: {
              type: 'string',
              description: 'The confidence level for this field value choice.',
              enum: ['low', 'medium', 'high'],
            },
          },
          required: ['field_id', 'value'],
        },
      },
      type: {
        type: 'object',
        description:
          'The issue type to associate with this issue. Only users with push access can set the type for issues. Without push access to the repository, type changes are silently dropped.',
        properties: {
          value: {
            type: 'string',
            description:
              'The name of the issue type to associate with this issue, or `null` to remove the current issue type.',
          },
          rationale: {
            type: 'string',
            description: 'Optional reasoning for selecting this type.',
          },
          suggest: {
            type: 'boolean',
            description:
              'If `true`, the change is stored as a pending suggestion for human review rather than applied directly.',
          },
          confidence: {
            type: 'string',
            description: 'The confidence level for this type choice.',
            enum: ['low', 'medium', 'high'],
          },
        },
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/issues/{issue_number}',
    body: [
      'title',
      'body',
      'assignee',
      'state',
      'state_reason',
      'duplicate_issue_id',
      'milestone',
      'labels',
      'assignees',
      'issue_field_values',
      'type',
    ],
  },
});
