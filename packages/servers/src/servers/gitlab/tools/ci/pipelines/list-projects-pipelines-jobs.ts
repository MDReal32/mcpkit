import { defineTool } from '@usemcpkit/core';

export const ciPipelinesListProjectsPipelinesJobs = defineTool({
  name: 'ci:pipelines:list_projects_pipelines_jobs',
  description: 'List all jobs by pipeline. Lists all jobs for a specified pipeline.',
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
      include_retried: {
        type: 'boolean',
        default: false,
        description: 'If `true`, includes retried jobs in the response.',
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
    path: '/projects/{id}/pipelines/{pipeline_id}/jobs',
    query: ['include_retried', 'scope', 'page', 'per_page'],
  },
});
