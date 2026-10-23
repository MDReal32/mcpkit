import { defineTool } from '@usemcpkit/core';

export const actionsActionsDownloadWorkflowRunLogs = defineTool({
  name: 'actions:actions:download_workflow_run_logs',
  description:
    'Download workflow run logs. Gets a redirect URL to download an archive of log files for a workflow run. This link expires after 1 minute. Look for `Location:` in the response header to find the URL for the download.',
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
      run_id: {
        type: 'integer',
        description: 'The unique identifier of the workflow run.',
      },
    },
    required: ['owner', 'repo', 'run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/logs',
  },
});
