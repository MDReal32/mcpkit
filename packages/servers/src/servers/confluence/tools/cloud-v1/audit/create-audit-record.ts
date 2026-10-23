import { defineTool } from '@usemcpkit/core';

export const cloudV1AuditCreateAuditRecord = defineTool({
  name: 'cloud_v1:audit:create_audit_record',
  description: '[Cloud v1] Create audit record. Creates a record in the audit log.',
  input: {
    type: 'object',
    properties: {
      author: {
        type: 'object',
        description:
          "The user that actioned the event. If `author` is not specified, then all `author` properties will be set to null/empty, except for `type` which will be set to 'user'.",
        properties: {
          type: {
            type: 'string',
            description: "Set to 'user'.",
            enum: ['user'],
          },
          displayName: {
            type: 'string',
            description: 'The name that is displayed on the audit log in the Confluence UI.',
          },
          operations: {
            type: 'array',
            description: 'Always defaults to null.',
            items: {
              type: 'object',
              description: 'An operation and the target entity that it applies to, e.g. create page.',
            },
          },
          username: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
          },
          userKey: {
            type: 'string',
            description:
              'This property is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
          },
        },
        required: ['type'],
      },
      remoteAddress: {
        type: 'string',
        description: 'The IP address of the computer where the event was initiated from.',
      },
      creationDate: {
        type: 'integer',
        description:
          'The creation date-time of the audit record, as a timestamp. This is converted to a date-time display in the Confluence UI. If the `creationDate` is not specified, then it will be set to the timestamp for the current date-time.',
      },
      summary: {
        type: 'string',
        description:
          "The summary of the event, which is displayed in the 'Change' column on the audit log in the Confluence UI.",
      },
      description: {
        type: 'string',
        description:
          "A long description of the event, which is displayed in the 'Description' field on the audit log in the Confluence UI.",
      },
      category: {
        type: 'string',
        description:
          "The category of the event, which is displayed in the 'Event type' column on the audit log in the Confluence UI.",
      },
      sysAdmin: {
        type: 'boolean',
        description: 'Indicates whether the event was actioned by a system administrator.',
      },
      affectedObject: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          objectType: {
            type: 'string',
          },
        },
        required: ['name', 'objectType'],
      },
      changedValues: {
        type: 'array',
        description: 'The values that were changed in the event.',
        items: {
          type: 'object',
        },
      },
      associatedObjects: {
        type: 'array',
        description:
          'Objects that were associated with the event. For example, if the event was a space permission change then the associated object would be the space.',
        items: {
          type: 'object',
        },
      },
    },
    required: ['remoteAddress'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/audit',
    body: [
      'author',
      'remoteAddress',
      'creationDate',
      'summary',
      'description',
      'category',
      'sysAdmin',
      'affectedObject',
      'changedValues',
      'associatedObjects',
    ],
  },
});
