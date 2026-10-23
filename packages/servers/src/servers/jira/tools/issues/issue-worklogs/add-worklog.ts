import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogsAddWorklog = defineTool({
  name: 'issues:issue_worklogs:add_worklog',
  description: 'Add worklog. Adds a worklog to an issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key the issue.',
      },
      notifyUsers: {
        type: 'boolean',
        default: true,
        description: 'Whether users watching the issue are notified by email.',
      },
      adjustEstimate: {
        type: 'string',
        default: 'auto',
        enum: ['new', 'leave', 'manual', 'auto'],
        description: "Defines how to update the issue's time estimate, the options are:",
      },
      newEstimate: {
        type: 'string',
        description:
          "The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`.",
      },
      reduceBy: {
        type: 'string',
        description:
          "The amount to reduce the issue's remaining estimate by, as days (\\#d), hours (\\#h), or minutes (\\#m). For example, *2d*. Required when `adjustEstimate` is `manual`.",
      },
      expand: {
        type: 'string',
        default: '',
        description:
          'Use expand to include additional information about work logs in the response. This parameter accepts `properties`, which returns worklog properties.',
      },
      overrideEditableFlag: {
        type: 'boolean',
        default: false,
        description:
          'Whether the worklog entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with *Administer Jira* global permission can use this flag.',
      },
      author: {
        type: 'object',
        description: 'Details of the user who created the worklog.',
        properties: {
          accountId: {
            type: 'string',
            description:
              'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
          },
          accountType: {
            type: 'string',
            description:
              "The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)",
          },
          active: {
            type: 'boolean',
            description: 'Whether the user is active.',
          },
          avatarUrls: {
            type: 'object',
            description: 'The avatars of the user.',
            properties: {
              '16x16': {
                type: 'string',
                description: "The URL of the item's 16x16 pixel avatar.",
              },
              '24x24': {
                type: 'string',
                description: "The URL of the item's 24x24 pixel avatar.",
              },
              '32x32': {
                type: 'string',
                description: "The URL of the item's 32x32 pixel avatar.",
              },
              '48x48': {
                type: 'string',
                description: "The URL of the item's 48x48 pixel avatar.",
              },
            },
          },
          displayName: {
            type: 'string',
            description:
              'The display name of the user. Depending on the user’s privacy settings, this may return an alternative value.',
          },
          emailAddress: {
            type: 'string',
            description:
              'The email address of the user. Depending on the user’s privacy settings, this may be returned as null.',
          },
          key: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
          },
          name: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
          },
          self: {
            type: 'string',
            description: 'The URL of the user.',
          },
          timeZone: {
            type: 'string',
            description:
              "The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null.",
          },
        },
      },
      comment: {
        type: 'string',
        description: 'A comment about the worklog. Optional when creating or updating a worklog.',
      },
      created: {
        type: 'string',
        description: 'The datetime on which the worklog was created.',
      },
      id: {
        type: 'string',
        description: 'The ID of the worklog record.',
      },
      issueId: {
        type: 'string',
        description: 'The ID of the issue this worklog is for.',
      },
      properties: {
        type: 'array',
        description: 'Details of properties for the worklog. Optional when creating or updating a worklog.',
        items: {
          type: 'object',
          description: 'An entity property, for more information see Entity properties.',
          properties: {
            key: {
              type: 'string',
              description: 'The key of the property. Required on create and update.',
            },
            value: {
              description: 'The value of the property. Required on create and update.',
            },
          },
        },
      },
      self: {
        type: 'string',
        description: 'The URL of the worklog item.',
      },
      started: {
        type: 'string',
        description:
          'The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog.',
      },
      timeSpent: {
        type: 'string',
        description:
          "The time spent working on the issue as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided.",
      },
      timeSpentSeconds: {
        type: 'integer',
        description:
          "The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided.",
      },
      updateAuthor: {
        type: 'object',
        description: 'Details of the user who last updated the worklog.',
        properties: {
          accountId: {
            type: 'string',
            description:
              'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
          },
          accountType: {
            type: 'string',
            description:
              "The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)",
          },
          active: {
            type: 'boolean',
            description: 'Whether the user is active.',
          },
          avatarUrls: {
            type: 'object',
            description: 'The avatars of the user.',
            properties: {
              '16x16': {
                type: 'string',
                description: "The URL of the item's 16x16 pixel avatar.",
              },
              '24x24': {
                type: 'string',
                description: "The URL of the item's 24x24 pixel avatar.",
              },
              '32x32': {
                type: 'string',
                description: "The URL of the item's 32x32 pixel avatar.",
              },
              '48x48': {
                type: 'string',
                description: "The URL of the item's 48x48 pixel avatar.",
              },
            },
          },
          displayName: {
            type: 'string',
            description:
              'The display name of the user. Depending on the user’s privacy settings, this may return an alternative value.',
          },
          emailAddress: {
            type: 'string',
            description:
              'The email address of the user. Depending on the user’s privacy settings, this may be returned as null.',
          },
          key: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
          },
          name: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
          },
          self: {
            type: 'string',
            description: 'The URL of the user.',
          },
          timeZone: {
            type: 'string',
            description:
              "The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null.",
          },
        },
      },
      updated: {
        type: 'string',
        description: 'The datetime on which the worklog was last updated.',
      },
      visibility: {
        type: 'object',
        description:
          'Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog.',
        properties: {
          identifier: {
            type: 'string',
            description: 'The ID of the group or the name of the role that visibility of this item is restricted to.',
          },
          type: {
            type: 'string',
            description: 'Whether visibility of this item is restricted to a group or role.',
            enum: ['group', 'role'],
          },
          value: {
            type: 'string',
            description:
              'The name of the group or role that visibility of this item is restricted to. Please note that the name of a group is mutable, to reliably identify a group use `identifier`.',
          },
        },
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog',
    query: ['notifyUsers', 'adjustEstimate', 'newEstimate', 'reduceBy', 'expand', 'overrideEditableFlag'],
    body: [
      'author',
      'comment',
      'created',
      'id',
      'issueId',
      'properties',
      'self',
      'started',
      'timeSpent',
      'timeSpentSeconds',
      'updateAuthor',
      'updated',
      'visibility',
    ],
  },
});
