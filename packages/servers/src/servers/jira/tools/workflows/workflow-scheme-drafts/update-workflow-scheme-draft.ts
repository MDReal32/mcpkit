import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsUpdateWorkflowSchemeDraft = defineTool({
  name: 'workflows:workflow_scheme_drafts:update_workflow_scheme_draft',
  description:
    'Update draft workflow scheme. Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a draft is created. Note that an active workflow scheme can only have one draft workflow scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the active workflow scheme that the draft was created from.',
      },
      defaultWorkflow: {
        type: 'string',
        description:
          'The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*.',
      },
      description: {
        type: 'string',
        description: 'The description of the workflow scheme.',
      },
      draft: {
        type: 'boolean',
        description: 'Whether the workflow scheme is a draft or not.',
      },
      body_id: {
        type: 'integer',
        description: 'The ID of the workflow scheme.',
      },
      issueTypeMappings: {
        type: 'object',
        description:
          'The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.',
      },
      issueTypes: {
        type: 'object',
        description: 'The issue types available in Jira.',
      },
      lastModified: {
        type: 'string',
        description:
          'The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.',
      },
      lastModifiedUser: {
        type: 'object',
        description:
          'The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.',
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
      name: {
        type: 'string',
        description:
          'The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.',
      },
      originalDefaultWorkflow: {
        type: 'string',
        description:
          'For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira.',
      },
      originalIssueTypeMappings: {
        type: 'object',
        description:
          'For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.',
      },
      self: {
        type: 'string',
      },
      updateDraftIfNeeded: {
        type: 'boolean',
        description:
          'Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/workflowscheme/{id}/draft',
    body: {
      defaultWorkflow: 'defaultWorkflow',
      description: 'description',
      draft: 'draft',
      id: 'body_id',
      issueTypeMappings: 'issueTypeMappings',
      issueTypes: 'issueTypes',
      lastModified: 'lastModified',
      lastModifiedUser: 'lastModifiedUser',
      name: 'name',
      originalDefaultWorkflow: 'originalDefaultWorkflow',
      originalIssueTypeMappings: 'originalIssueTypeMappings',
      self: 'self',
      updateDraftIfNeeded: 'updateDraftIfNeeded',
    },
  },
});
