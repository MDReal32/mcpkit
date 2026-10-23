import { defineTool } from '@usemcpkit/core';

export const actionsDownloadJobLogsForWorkflowRun = defineTool({
  name: 'actions:download_job_logs_for_workflow_run',
  description:
    'Download job logs for a workflow run. Gets a redirect URL to download a plain text file of logs for a workflow job. This link expires after 1 minute. Look for `Location:` in the response header to find the URL for the download.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      job_id: {
        type: 'integer',
        description: 'The unique identifier of the job.',
      },
    },
    required: ['owner', 'repo', 'job_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/jobs/{job_id}/logs',
  },
});
