import { defineTool } from '@usemcpkit/core';

export const ciPipelinesListProjectsPipelinesTriggerJobs = defineTool({
  name: 'ci:pipelines:list_projects_pipelines_trigger_jobs',
  description: 'List all trigger jobs by pipeline. Lists all trigger jobs for a specified pipeline.',
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
      scope: {
        type: 'string',
        description: 'The scope of builds to show',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'pipeline_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/pipelines/{pipeline_id}/trigger_jobs',
    query: ['scope', 'page', 'per_page'],
  },
});
