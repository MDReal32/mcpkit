import { defineTool } from '@usemcpkit/core';

export const projectsProjectVersionsUpdateVersion = defineTool({
  name: 'projects:project_versions:update_version',
  description: 'Update version. Updates a project version.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the version.',
      },
      approvers: {
        type: 'array',
        description:
          'If the expand option `approvers` is used, returns a list containing the approvers for this version.',
        items: {
          type: 'object',
          description: 'Contains details about a version approver.',
          properties: {
            accountId: {
              type: 'string',
              description: 'The Atlassian account ID of the approver.',
            },
            declineReason: {
              type: 'string',
              description: 'A description of why the user is declining the approval.',
            },
            description: {
              type: 'string',
              description: 'A description of what the user is approving within the specified version.',
            },
            status: {
              type: 'string',
              description: 'The status of the approval, which can be *PENDING*, *APPROVED*, or *DECLINED*',
            },
          },
        },
      },
      archived: {
        type: 'boolean',
        description: 'Indicates that the version is archived. Optional when creating or updating a version.',
      },
      description: {
        type: 'string',
        description:
          'The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes.',
      },
      driver: {
        type: 'string',
        description:
          'The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option `driver` is used, returns the Atlassian account ID of the driver.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
      body_id: {
        type: 'string',
        description: 'The ID of the version.',
      },
      issuesStatusForFixVersion: {
        type: 'object',
        description:
          'If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.',
        properties: {
          done: {
            type: 'integer',
            description: 'Count of issues with status *done*.',
          },
          inProgress: {
            type: 'integer',
            description: 'Count of issues with status *in progress*.',
          },
          toDo: {
            type: 'integer',
            description: 'Count of issues with status *to do*.',
          },
          unmapped: {
            type: 'integer',
            description: 'Count of issues with a status other than *to do*, *in progress*, and *done*.',
          },
        },
      },
      moveUnfixedIssuesTo: {
        type: 'string',
        description:
          'The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version.',
      },
      name: {
        type: 'string',
        description:
          'The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.',
      },
      operations: {
        type: 'array',
        description:
          'If the expand option `operations` is used, returns the list of operations available for this version.',
        items: {
          type: 'object',
          description: 'Details about the operations available in this version.',
          properties: {
            href: {
              type: 'string',
            },
            iconClass: {
              type: 'string',
            },
            id: {
              type: 'string',
            },
            label: {
              type: 'string',
            },
            styleClass: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            weight: {
              type: 'integer',
            },
          },
        },
      },
      overdue: {
        type: 'boolean',
        description: 'Indicates that the version is overdue.',
      },
      project: {
        type: 'string',
        description: 'Deprecated. Use `projectId`.',
      },
      projectId: {
        type: 'integer',
        description:
          'The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version.',
      },
      releaseDate: {
        type: 'string',
        description:
          'The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.',
      },
      released: {
        type: 'boolean',
        description:
          'Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.',
      },
      self: {
        type: 'string',
        description: 'The URL of the version.',
      },
      startDate: {
        type: 'string',
        description:
          'The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.',
      },
      userReleaseDate: {
        type: 'string',
        description:
          "The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format.",
      },
      userStartDate: {
        type: 'string',
        description:
          "The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format.",
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/version/{id}',
    body: {
      approvers: 'approvers',
      archived: 'archived',
      description: 'description',
      driver: 'driver',
      expand: 'expand',
      id: 'body_id',
      issuesStatusForFixVersion: 'issuesStatusForFixVersion',
      moveUnfixedIssuesTo: 'moveUnfixedIssuesTo',
      name: 'name',
      operations: 'operations',
      overdue: 'overdue',
      project: 'project',
      projectId: 'projectId',
      releaseDate: 'releaseDate',
      released: 'released',
      self: 'self',
      startDate: 'startDate',
      userReleaseDate: 'userReleaseDate',
      userStartDate: 'userStartDate',
    },
  },
});
