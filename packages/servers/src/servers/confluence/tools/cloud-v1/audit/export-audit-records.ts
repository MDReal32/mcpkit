import { defineTool } from '@usemcpkit/core';

export const cloudV1AuditExportAuditRecords = defineTool({
  name: 'cloud_v1:audit:export_audit_records',
  description: '[Cloud v1] Export audit records. Exports audit records as a CSV file or ZIP file.',
  input: {
    type: 'object',
    properties: {
      startDate: {
        type: 'string',
        description:
          'Filters the exported results to the records on or after the `startDate`. The `startDate` must be specified as epoch time in milliseconds.',
      },
      endDate: {
        type: 'string',
        description:
          'Filters the exported results to the records on or before the `endDate`. The `endDate` must be specified as epoch time in milliseconds.',
      },
      searchString: {
        type: 'string',
        description:
          'Filters the exported results to records that have string property values matching the `searchString`.',
      },
      format: {
        type: 'string',
        enum: ['csv', 'zip'],
        description: 'The format of the export file for the audit records.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/audit/export',
    query: ['startDate', 'endDate', 'searchString', 'format'],
  },
});
