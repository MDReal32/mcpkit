import { defineTool } from '@usemcpkit/core';

export const issuesIssueRedactionGetRedactionStatus = defineTool({
  name: 'issues:issue_redaction:get_redaction_status',
  description: 'Get redaction status. Retrieves the current status of a redaction job ID.',
  input: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
        description: 'Redaction job id',
      },
    },
    required: ['jobId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/redact/status/{jobId}',
  },
});
