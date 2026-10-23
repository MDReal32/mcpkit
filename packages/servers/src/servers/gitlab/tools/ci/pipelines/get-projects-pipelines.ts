import { defineTool } from '@usemcpkit/core';

export const ciPipelinesGetProjectsPipelines = defineTool({
  name: 'ci:pipelines:get_projects_pipelines',
  description: 'Retrieve a pipeline. Retrieves a specified pipeline from a project. You can also get a child pipeline.',
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
    method: 'GET',
    path: '/projects/{id}/pipelines/{pipeline_id}',
  },
});
