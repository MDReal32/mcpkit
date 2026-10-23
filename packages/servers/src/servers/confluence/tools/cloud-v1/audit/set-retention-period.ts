import { defineTool } from '@usemcpkit/core';

export const cloudV1AuditSetRetentionPeriod = defineTool({
  name: 'cloud_v1:audit:set_retention_period',
  description:
    '[Cloud v1] Set retention period. Sets the retention period for records in the audit log. The retention period can be set to a maximum of 1 year.',
  input: {
    type: 'object',
    properties: {
      number: {
        type: 'integer',
        description: 'The number of units for the retention period.',
      },
      units: {
        type: 'string',
        description: 'The unit of time that the retention period is measured in.',
        enum: [
          'NANOS',
          'MICROS',
          'MILLIS',
          'SECONDS',
          'MINUTES',
          'HOURS',
          'HALF_DAYS',
          'DAYS',
          'WEEKS',
          'MONTHS',
          'YEARS',
          'DECADES',
          'CENTURIES',
          'MILLENNIA',
          'ERAS',
          'FOREVER',
        ],
      },
    },
    required: ['number', 'units'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/rest/api/audit/retention',
    body: ['number', 'units'],
  },
});
