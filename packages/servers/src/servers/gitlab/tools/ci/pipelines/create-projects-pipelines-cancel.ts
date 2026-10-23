import { defineTool } from '@usemcpkit/core';

export const ciPipelinesCreateProjectsPipelinesCancel = defineTool({
  name: 'ci:pipelines:create_projects_pipelines_cancel',
  description: 'Cancel all jobs for a pipeline. Cancels all jobs in a specified pipeline.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      pipeline_id: {
        type: 'integer',
        description: 'ID of the pipeline.',
      },
    },
    required: ['id', 'pipeline_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/pipelines/{pipeline_id}/cancel',
  },
});
