import { defineTool } from '@usemcpkit/core';

export const collaborationFiltersCreateFilter = defineTool({
  name: 'collaboration:filters:create_filter',
  description:
    'Create filter. Creates a filter. The filter is shared according to the default share scope. The filter is not selected as a favorite.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
      overrideSharePermissions: {
        type: 'boolean',
        default: false,
        description:
          'EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be created. Available to users with *Administer Jira* global permission.',
      },
      approximateLastUsed: {
        type: 'string',
        description:
          "\\[Experimental\\] Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate.",
      },
      description: {
        type: 'string',
        description: 'A description of the filter.',
      },
      editPermissions: {
        type: 'array',
        description: 'The groups and projects that can edit the filter.',
        items: {
          type: 'object',
          description: 'Details of a share permission for the filter.',
          properties: {
            group: {
              type: 'object',
              description:
                "The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.",
            },
            id: {
              type: 'integer',
              description: 'The unique identifier of the share permission.',
            },
            project: {
              type: 'object',
              description:
                'The project that the filter is shared with. This is similar to the project object returned by Get project but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`. For a request, specify the `id` for the project.',
            },
            role: {
              type: 'object',
              description:
                'The project role that the filter is shared with. For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.',
            },
            type: {
              type: 'string',
              description: 'The type of share permission:',
              enum: [
                'user',
                'group',
                'project',
                'projectRole',
                'global',
                'loggedin',
                'authenticated',
                'project-unknown',
              ],
            },
            user: {
              type: 'object',
              description:
                'The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.',
            },
          },
          required: ['type'],
        },
      },
      favourite: {
        type: 'boolean',
        description: 'Whether the filter is selected as a favorite.',
      },
      favouritedCount: {
        type: 'integer',
        description: 'The count of how many users have selected this filter as a favorite, including the filter owner.',
      },
      id: {
        type: 'string',
        description: 'The unique identifier for the filter.',
      },
      jql: {
        type: 'string',
        description: 'The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*.',
      },
      name: {
        type: 'string',
        description: 'The name of the filter. Must be unique.',
      },
      owner: {
        type: 'object',
        description:
          'The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can change the owner of a shared filter in the admin settings.',
        properties: {
          accountId: {
            type: 'string',
            description:
              'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests.',
          },
          accountType: {
            type: 'string',
            description: 'The user account type. Can take the following values:',
            enum: ['atlassian', 'app', 'customer', 'unknown'],
          },
          active: {
            type: 'boolean',
            description: 'Whether the user is active.',
          },
          appType: {
            type: 'string',
            description: "The app type of the user account when accountType is 'app'. Can take the following values:",
          },
          applicationRoles: {
            type: 'object',
            description: 'The application roles the user is assigned to.',
            properties: {
              callback: {
                type: 'object',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  description: 'Details of an application role.',
                },
              },
              'max-results': {
                type: 'integer',
              },
              pagingCallback: {
                type: 'object',
              },
              size: {
                type: 'integer',
              },
            },
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
              'The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.',
          },
          emailAddress: {
            type: 'string',
            description:
              'The email address of the user. Depending on the user’s privacy setting, this may be returned as null.',
          },
          expand: {
            type: 'string',
            description: 'Expand options that include additional user details in the response.',
          },
          groups: {
            type: 'object',
            description: 'The groups that the user belongs to.',
            properties: {
              callback: {
                type: 'object',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  description: 'Details about a group.',
                },
              },
              'max-results': {
                type: 'integer',
              },
              pagingCallback: {
                type: 'object',
              },
              size: {
                type: 'integer',
              },
            },
          },
          guest: {
            type: 'boolean',
            description: 'Whether the user is a guest.',
          },
          key: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. See the deprecation notice for details.',
          },
          locale: {
            type: 'string',
            description:
              'The locale of the user. Depending on the user’s privacy setting, this may be returned as null.',
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
              "The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned.",
          },
        },
      },
      searchUrl: {
        type: 'string',
        description:
          "A URL to view the filter results in Jira, using the Search for issues using JQL operation with the filter's JQL string to return the filter results. For example, *https://your-domain.atlassian.net/rest/api/2/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*.",
      },
      self: {
        type: 'string',
        description: 'The URL of the filter.',
      },
      sharePermissions: {
        type: 'array',
        description: 'The groups and projects that the filter is shared with.',
        items: {
          type: 'object',
          description: 'Details of a share permission for the filter.',
          properties: {
            group: {
              type: 'object',
              description:
                "The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.",
            },
            id: {
              type: 'integer',
              description: 'The unique identifier of the share permission.',
            },
            project: {
              type: 'object',
              description:
                'The project that the filter is shared with. This is similar to the project object returned by Get project but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`. For a request, specify the `id` for the project.',
            },
            role: {
              type: 'object',
              description:
                'The project role that the filter is shared with. For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.',
            },
            type: {
              type: 'string',
              description: 'The type of share permission:',
              enum: [
                'user',
                'group',
                'project',
                'projectRole',
                'global',
                'loggedin',
                'authenticated',
                'project-unknown',
              ],
            },
            user: {
              type: 'object',
              description:
                'The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.',
            },
          },
          required: ['type'],
        },
      },
      sharedUsers: {
        type: 'object',
        description:
          'A paginated list of the users that the filter is shared with. This includes users that are members of the groups or can browse the projects that the filter is shared with.',
        properties: {
          'end-index': {
            type: 'integer',
            description: 'The index of the last item returned on the page.',
          },
          items: {
            type: 'array',
            description: 'The list of items.',
            items: {
              type: 'object',
              description:
                "A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:",
            },
          },
          'max-results': {
            type: 'integer',
            description: 'The maximum number of results that could be on the page.',
          },
          size: {
            type: 'integer',
            description: 'The number of items on the page.',
          },
          'start-index': {
            type: 'integer',
            description: 'The index of the first item returned on the page.',
          },
        },
      },
      subscriptions: {
        type: 'object',
        description: 'A paginated list of the users that are subscribed to the filter.',
        properties: {
          'end-index': {
            type: 'integer',
            description: 'The index of the last item returned on the page.',
          },
          items: {
            type: 'array',
            description: 'The list of items.',
            items: {
              type: 'object',
              description: 'Details of a user or group subscribing to a filter.',
            },
          },
          'max-results': {
            type: 'integer',
            description: 'The maximum number of results that could be on the page.',
          },
          size: {
            type: 'integer',
            description: 'The number of items on the page.',
          },
          'start-index': {
            type: 'integer',
            description: 'The index of the first item returned on the page.',
          },
        },
      },
      viewUrl: {
        type: 'string',
        description:
          'A URL to view the filter results in Jira, using the ID of the filter. For example, *https://your-domain.atlassian.net/issues/?filter=10100*.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/filter',
    query: ['expand', 'overrideSharePermissions'],
    body: [
      'approximateLastUsed',
      'description',
      'editPermissions',
      'favourite',
      'favouritedCount',
      'id',
      'jql',
      'name',
      'owner',
      'searchUrl',
      'self',
      'sharePermissions',
      'sharedUsers',
      'subscriptions',
      'viewUrl',
    ],
  },
});
