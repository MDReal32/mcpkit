import { defineTool } from '@usemcpkit/core';

export const issuesIssueRedactionRedact = defineTool({
  name: 'issues:issue_redaction:redact',
  description:
    'Redact. Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields asynchronously.',
  input: {
    type: 'object',
    properties: {
      redactions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            contentItem: {
              type: 'object',
              description: 'Represents the content to redact',
            },
            externalId: {
              type: 'string',
              description: 'Unique id for the redaction request; ID format should be of UUID',
            },
            reason: {
              type: 'string',
              description: 'The reason why the content is being redacted',
            },
            redactionPosition: {
              type: 'object',
              description: 'Represents the position of the redaction',
            },
          },
          required: ['contentItem', 'externalId', 'reason', 'redactionPosition'],
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/redact',
    body: ['redactions'],
  },
});
