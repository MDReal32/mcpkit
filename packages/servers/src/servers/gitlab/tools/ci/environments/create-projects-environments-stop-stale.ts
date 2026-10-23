import { defineTool } from '@usemcpkit/core';

export const ciEnvironmentsCreateProjectsEnvironmentsStopStale = defineTool({
  name: 'ci:environments:create_projects_environments_stop_stale',
  description:
    'Stop stale environments. Stops all environments that were last modified or deployed to before a specified date. Excludes protected environments.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      before: {
        type: 'string',
        description:
          'Stop environments that were modified or deployed to before the specified date. Valid inputs are between 10 years ago and 1 week ago.',
      },
    },
    required: ['id', 'before'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/environments/stop_stale',
    body: ['before'],
  },
});
