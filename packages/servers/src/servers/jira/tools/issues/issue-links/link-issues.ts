import { defineTool } from '@usemcpkit/core';

export const issuesIssueLinksLinkIssues = defineTool({
  name: 'issues:issue_links:link_issues',
  description:
    'Create issue link. Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally add a comment to the from (outward) issue. To use this resource the site must have Issue Linking enabled.',
  input: {
    type: 'object',
    properties: {
      comment: {
        type: 'object',
        description: 'A comment.',
        properties: {
          author: {
            type: 'object',
            description: 'The ID of the user who created the comment.',
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
          body: {
            type: 'string',
            description: 'The comment text.',
          },
          created: {
            type: 'string',
            description: 'The date and time at which the comment was created.',
          },
          id: {
            type: 'string',
            description: 'The ID of the comment.',
          },
          jsdAuthorCanSeeRequest: {
            type: 'boolean',
            description:
              'Whether the comment was added from an email sent by a person who is not part of the issue. See Allow external emails to be added as comments on issuesfor information on setting up this feature.',
          },
          jsdPublic: {
            type: 'boolean',
            description:
              "Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Se…",
          },
          properties: {
            type: 'array',
            description: 'A list of comment properties. Optional on create and update.',
            items: {
              type: 'object',
              description: 'An entity property, for more information see Entity properties.',
            },
          },
          renderedBody: {
            type: 'string',
            description: 'The rendered version of the comment.',
          },
          self: {
            type: 'string',
            description: 'The URL of the comment.',
          },
          updateAuthor: {
            type: 'object',
            description: 'The ID of the user who updated the comment last.',
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
            description: 'The date and time at which the comment was updated last.',
          },
          visibility: {
            type: 'object',
            description: 'The group or role to which this comment is visible. Optional on create and update.',
            properties: {
              identifier: {
                type: 'string',
                description:
                  'The ID of the group or the name of the role that visibility of this item is restricted to.',
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
      },
      inwardIssue: {
        type: 'object',
        description: 'The ID or key of a linked issue.',
        properties: {
          fields: {
            type: 'object',
            description: 'The fields associated with the issue.',
            properties: {
              assignee: {
                type: 'object',
                description: 'The assignee of the linked issue.',
              },
              issueType: {
                type: 'object',
                description: 'The type of the linked issue.',
              },
              issuetype: {
                type: 'object',
                description: 'Details about an issue type.',
              },
              priority: {
                type: 'object',
                description: 'The priority of the linked issue.',
              },
              status: {
                type: 'object',
                description: 'The status of the linked issue.',
              },
              summary: {
                type: 'string',
                description: 'The summary description of the linked issue.',
              },
              timetracking: {
                type: 'object',
                description: 'The time tracking of the linked issue.',
              },
            },
          },
          id: {
            type: 'string',
            description: "The ID of an issue. Required if `key` isn't provided.",
          },
          key: {
            type: 'string',
            description: "The key of an issue. Required if `id` isn't provided.",
          },
          self: {
            type: 'string',
            description: 'The URL of the issue.',
          },
        },
      },
      outwardIssue: {
        type: 'object',
        description: 'The ID or key of a linked issue.',
        properties: {
          fields: {
            type: 'object',
            description: 'The fields associated with the issue.',
            properties: {
              assignee: {
                type: 'object',
                description: 'The assignee of the linked issue.',
              },
              issueType: {
                type: 'object',
                description: 'The type of the linked issue.',
              },
              issuetype: {
                type: 'object',
                description: 'Details about an issue type.',
              },
              priority: {
                type: 'object',
                description: 'The priority of the linked issue.',
              },
              status: {
                type: 'object',
                description: 'The status of the linked issue.',
              },
              summary: {
                type: 'string',
                description: 'The summary description of the linked issue.',
              },
              timetracking: {
                type: 'object',
                description: 'The time tracking of the linked issue.',
              },
            },
          },
          id: {
            type: 'string',
            description: "The ID of an issue. Required if `key` isn't provided.",
          },
          key: {
            type: 'string',
            description: "The key of an issue. Required if `id` isn't provided.",
          },
          self: {
            type: 'string',
            description: 'The URL of the issue.',
          },
        },
      },
      type: {
        type: 'object',
        description: 'This object is used as follows:',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the issue link type and is used as follows:',
          },
          inward: {
            type: 'string',
            description: 'The description of the issue link type inward link and is used as follows:',
          },
          name: {
            type: 'string',
            description: 'The name of the issue link type and is used as follows:',
          },
          outward: {
            type: 'string',
            description: 'The description of the issue link type outward link and is used as follows:',
          },
          self: {
            type: 'string',
            description: 'The URL of the issue link type. Read only.',
          },
        },
      },
    },
    required: ['inwardIssue', 'outwardIssue', 'type'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issueLink',
    body: ['comment', 'inwardIssue', 'outwardIssue', 'type'],
  },
});
