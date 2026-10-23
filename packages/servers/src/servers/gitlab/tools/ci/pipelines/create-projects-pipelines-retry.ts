import { defineTool } from '@usemcpkit/core';

export const ciPipelinesCreateProjectsPipelinesRetry = defineTool({
  name: 'ci:pipelines:create_projects_pipelines_retry',
  description:
    'Retry jobs in a pipeline. Retries failed or canceled jobs in a pipeline. If there are no failed or canceled jobs in the pipeline, calling this endpoint has no effect.',
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
    path: '/projects/{id}/pipelines/{pipeline_id}/retry',
  },
});
