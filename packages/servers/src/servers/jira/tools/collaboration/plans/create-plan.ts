import { defineTool } from '@usemcpkit/core';

export const collaborationPlansCreatePlan = defineTool({
  name: 'collaboration:plans:create_plan',
  description: 'Create plan. Creates a plan.',
  input: {
    type: 'object',
    properties: {
      useGroupId: {
        type: 'boolean',
        default: false,
        description: 'Whether to accept group IDs instead of group names. Group names are deprecated.',
      },
      crossProjectReleases: {
        type: 'array',
        description: 'The cross-project releases to include in the plan.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The cross-project release name.',
            },
            releaseIds: {
              type: 'array',
              description: 'The IDs of the releases to include in the cross-project release.',
              items: {
                type: 'integer',
              },
            },
          },
          required: ['name'],
        },
      },
      customFields: {
        type: 'array',
        description: 'The custom fields for the plan.',
        items: {
          type: 'object',
          properties: {
            customFieldId: {
              type: 'integer',
              description: 'The custom field ID.',
            },
            filter: {
              type: 'boolean',
              description: 'Allows filtering issues based on their values for the custom field.',
            },
          },
          required: ['customFieldId'],
        },
      },
      exclusionRules: {
        type: 'object',
        description: 'The exclusion rules for the plan.',
        properties: {
          issueIds: {
            type: 'array',
            description: 'The IDs of the issues to exclude from the plan.',
            items: {
              type: 'integer',
            },
          },
          issueTypeIds: {
            type: 'array',
            description: 'The IDs of the issue types to exclude from the plan.',
            items: {
              type: 'integer',
            },
          },
          numberOfDaysToShowCompletedIssues: {
            type: 'integer',
            description: 'Issues completed this number of days ago will be excluded from the plan.',
          },
          releaseIds: {
            type: 'array',
            description: 'The IDs of the releases to exclude from the plan.',
            items: {
              type: 'integer',
            },
          },
          workStatusCategoryIds: {
            type: 'array',
            description: 'The IDs of the work status categories to exclude from the plan.',
            items: {
              type: 'integer',
            },
          },
          workStatusIds: {
            type: 'array',
            description: 'The IDs of the work statuses to exclude from the plan.',
            items: {
              type: 'integer',
            },
          },
        },
      },
      issueSources: {
        type: 'array',
        description: 'The issue sources to include in the plan.',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: 'The issue source type. This must be "Board", "Project" or "Filter".',
              enum: ['Board', 'Project', 'Filter'],
            },
            value: {
              type: 'integer',
              description:
                'The issue source value. This must be a board ID if the type is "Board", a project ID if the type is "Project" or a filter ID if the type is "Filter".',
            },
          },
          required: ['type', 'value'],
        },
      },
      leadAccountId: {
        type: 'string',
        description: 'The account ID of the plan lead.',
      },
      name: {
        type: 'string',
        description: 'The plan name.',
      },
      permissions: {
        type: 'array',
        description: 'The permissions for the plan.',
        items: {
          type: 'object',
          properties: {
            holder: {
              type: 'object',
              description: 'The permission holder.',
            },
            type: {
              type: 'string',
              description: 'The permission type. This must be "View" or "Edit".',
              enum: ['View', 'Edit'],
            },
          },
          required: ['holder', 'type'],
        },
      },
      scheduling: {
        type: 'object',
        description: 'The scheduling settings for the plan.',
        properties: {
          dependencies: {
            type: 'string',
            description: 'The dependencies for the plan. This must be "Sequential" or "Concurrent".',
            enum: ['Sequential', 'Concurrent'],
          },
          endDate: {
            type: 'object',
            description: 'The end date field for the plan.',
            properties: {
              dateCustomFieldId: {
                type: 'integer',
                description: 'A date custom field ID. This is required if the type is "DateCustomField".',
              },
              type: {
                type: 'string',
                description:
                  'The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField".',
                enum: ['DueDate', 'TargetStartDate', 'TargetEndDate', 'DateCustomField'],
              },
            },
            required: ['type'],
          },
          estimation: {
            type: 'string',
            description: 'The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours".',
            enum: ['StoryPoints', 'Days', 'Hours'],
          },
          inferredDates: {
            type: 'string',
            description: 'The inferred dates for the plan. This must be "None", "SprintDates" or "ReleaseDates".',
            enum: ['None', 'SprintDates', 'ReleaseDates'],
          },
          startDate: {
            type: 'object',
            description: 'The start date field for the plan.',
            properties: {
              dateCustomFieldId: {
                type: 'integer',
                description: 'A date custom field ID. This is required if the type is "DateCustomField".',
              },
              type: {
                type: 'string',
                description:
                  'The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField".',
                enum: ['DueDate', 'TargetStartDate', 'TargetEndDate', 'DateCustomField'],
              },
            },
            required: ['type'],
          },
        },
        required: ['estimation'],
      },
    },
    required: ['issueSources', 'name', 'scheduling'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/plans/plan',
    query: ['useGroupId'],
    body: [
      'crossProjectReleases',
      'customFields',
      'exclusionRules',
      'issueSources',
      'leadAccountId',
      'name',
      'permissions',
      'scheduling',
    ],
  },
});
