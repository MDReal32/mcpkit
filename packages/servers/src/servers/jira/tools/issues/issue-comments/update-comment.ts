import { defineTool } from '@usemcpkit/core';

export const issuesIssueCommentsUpdateComment = defineTool({
  name: 'issues:issue_comments:update_comment',
  description: 'Update comment. Updates a comment.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      id: {
        type: 'string',
        description: 'The ID of the comment.',
      },
      notifyUsers: {
        type: 'boolean',
        default: true,
        description: 'Whether users are notified when a comment is updated.',
      },
      overrideEditableFlag: {
        type: 'boolean',
        default: false,
        description:
          'Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with the *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML.',
      },
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
      body: {
        type: 'string',
        description: 'The comment text.',
      },
      created: {
        type: 'string',
        description: 'The date and time at which the comment was created.',
      },
      body_id: {
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
        description: 'The date and time at which the comment was updated last.',
      },
      visibility: {
        type: 'object',
        description: 'The group or role to which this comment is visible. Optional on create and update.',
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
    required: ['issueIdOrKey', 'id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issue/{issueIdOrKey}/comment/{id}',
    query: ['notifyUsers', 'overrideEditableFlag', 'expand'],
    body: {
      author: 'author',
      body: 'body',
      created: 'created',
      id: 'body_id',
      jsdAuthorCanSeeRequest: 'jsdAuthorCanSeeRequest',
      jsdPublic: 'jsdPublic',
      properties: 'properties',
      renderedBody: 'renderedBody',
      self: 'self',
      updateAuthor: 'updateAuthor',
      updated: 'updated',
      visibility: 'visibility',
    },
  },
});
