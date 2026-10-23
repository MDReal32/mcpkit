import { defineTool } from '@usemcpkit/core';

export const issuesIssuesEditIssue = defineTool({
  name: 'issues:issues:edit_issue',
  description:
    'Edit issue. Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not supported and is ignored here. To transition an issue, please use Transition issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      notifyUsers: {
        type: 'boolean',
        default: true,
        description:
          "Whether a notification email about the issue update is sent to all watchers. To disable the notification, administer Jira or administer project permissions are required. If the user doesn't have the necessary permission the request is ignored.",
      },
      overrideScreenSecurity: {
        type: 'boolean',
        default: false,
        description:
          'Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
      overrideEditableFlag: {
        type: 'boolean',
        default: false,
        description:
          'Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* global permission and Forge apps acting on behalf of users with *Administer Jira* global permission.',
      },
      returnIssue: {
        type: 'boolean',
        default: false,
        description:
          'Whether the response should contain the issue with fields edited in this request. The returned issue will have the same format as in the Get issue API.',
      },
      expand: {
        type: 'string',
        default: '',
        description:
          'The Get issue API expand parameter to use in the response if the `returnIssue` parameter is `true`.',
      },
      fields: {
        type: 'object',
        description:
          'List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`.',
      },
      historyMetadata: {
        type: 'object',
        description: 'Additional issue history details.',
        properties: {
          activityDescription: {
            type: 'string',
            description: 'The activity described in the history record.',
          },
          activityDescriptionKey: {
            type: 'string',
            description: 'The key of the activity described in the history record.',
          },
          actor: {
            type: 'object',
            description: 'Details of the user whose action created the history record.',
            properties: {
              avatarUrl: {
                type: 'string',
                description: 'The URL to an avatar for the user or system associated with a history record.',
              },
              displayName: {
                type: 'string',
                description: 'The display name of the user or system associated with a history record.',
              },
              displayNameKey: {
                type: 'string',
                description: 'The key of the display name of the user or system associated with a history record.',
              },
              id: {
                type: 'string',
                description: 'The ID of the user or system associated with a history record.',
              },
              type: {
                type: 'string',
                description: 'The type of the user or system associated with a history record.',
              },
              url: {
                type: 'string',
                description: 'The URL of the user or system associated with a history record.',
              },
            },
          },
          cause: {
            type: 'object',
            description: 'Details of the cause that triggered the creation the history record.',
            properties: {
              avatarUrl: {
                type: 'string',
                description: 'The URL to an avatar for the user or system associated with a history record.',
              },
              displayName: {
                type: 'string',
                description: 'The display name of the user or system associated with a history record.',
              },
              displayNameKey: {
                type: 'string',
                description: 'The key of the display name of the user or system associated with a history record.',
              },
              id: {
                type: 'string',
                description: 'The ID of the user or system associated with a history record.',
              },
              type: {
                type: 'string',
                description: 'The type of the user or system associated with a history record.',
              },
              url: {
                type: 'string',
                description: 'The URL of the user or system associated with a history record.',
              },
            },
          },
          description: {
            type: 'string',
            description: 'The description of the history record.',
          },
          descriptionKey: {
            type: 'string',
            description: 'The description key of the history record.',
          },
          emailDescription: {
            type: 'string',
            description: 'The description of the email address associated the history record.',
          },
          emailDescriptionKey: {
            type: 'string',
            description: 'The description key of the email address associated the history record.',
          },
          extraData: {
            type: 'object',
            description: 'Additional arbitrary information about the history record.',
          },
          generator: {
            type: 'object',
            description: 'Details of the system that generated the history record.',
            properties: {
              avatarUrl: {
                type: 'string',
                description: 'The URL to an avatar for the user or system associated with a history record.',
              },
              displayName: {
                type: 'string',
                description: 'The display name of the user or system associated with a history record.',
              },
              displayNameKey: {
                type: 'string',
                description: 'The key of the display name of the user or system associated with a history record.',
              },
              id: {
                type: 'string',
                description: 'The ID of the user or system associated with a history record.',
              },
              type: {
                type: 'string',
                description: 'The type of the user or system associated with a history record.',
              },
              url: {
                type: 'string',
                description: 'The URL of the user or system associated with a history record.',
              },
            },
          },
          type: {
            type: 'string',
            description: 'The type of the history record.',
          },
        },
      },
      properties: {
        type: 'array',
        description: 'Details of issue properties to be add or update.',
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
      transition: {
        type: 'object',
        description:
          'Details of a transition. Required when performing a transition, optional when creating or editing an issue.',
        properties: {
          expand: {
            type: 'string',
            description: 'Expand options that include additional transition details in the response.',
          },
          fields: {
            type: 'object',
            description:
              'Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request.',
          },
          hasScreen: {
            type: 'boolean',
            description: 'Whether there is a screen associated with the issue transition.',
          },
          id: {
            type: 'string',
            description: 'The ID of the issue transition. Required when specifying a transition to undertake.',
          },
          isAvailable: {
            type: 'boolean',
            description: 'Whether the transition is available to be performed.',
          },
          isConditional: {
            type: 'boolean',
            description: 'Whether the issue has to meet criteria before the issue transition is applied.',
          },
          isGlobal: {
            type: 'boolean',
            description:
              'Whether the issue transition is global, that is, the transition is applied to issues regardless of their status.',
          },
          isInitial: {
            type: 'boolean',
            description: 'Whether this is the initial issue transition for the workflow.',
          },
          looped: {
            type: 'boolean',
          },
          name: {
            type: 'string',
            description: 'The name of the issue transition.',
          },
          to: {
            type: 'object',
            description: 'Details of the issue status after the transition.',
            properties: {
              description: {
                type: 'string',
                description: 'The description of the status.',
              },
              iconUrl: {
                type: 'string',
                description: 'The URL of the icon used to represent the status.',
              },
              id: {
                type: 'string',
                description: 'The ID of the status.',
              },
              name: {
                type: 'string',
                description: 'The name of the status.',
              },
              scope: {
                type: 'object',
                description: 'The scope of the field.',
              },
              self: {
                type: 'string',
                description: 'The URL of the status.',
              },
              statusCategory: {
                type: 'object',
                description: 'The category assigned to the status.',
              },
            },
          },
        },
      },
      update: {
        type: 'object',
        description:
          'A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issue/{issueIdOrKey}',
    query: ['notifyUsers', 'overrideScreenSecurity', 'overrideEditableFlag', 'returnIssue', 'expand'],
    body: ['fields', 'historyMetadata', 'properties', 'transition', 'update'],
  },
});
