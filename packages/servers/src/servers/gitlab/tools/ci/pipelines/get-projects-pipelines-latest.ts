import { defineTool } from '@usemcpkit/core';

export const ciPipelinesGetProjectsPipelinesLatest = defineTool({
  name: 'ci:pipelines:get_projects_pipelines_latest',
  description:
    'Retrieve the latest pipeline. Retrieves the latest pipeline for the most recent commit on a specified ref in a project. If no pipeline exists for the commit, a `403` status code is returned. Use the `page` and `per_page` pagination parameters to control the pagination of results.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      ref: {
        type: 'string',
        description: 'Branch or tag to check for the latest pipeline. If omitted, uses the default branch.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/pipelines/latest',
    query: ['ref'],
  },
});
