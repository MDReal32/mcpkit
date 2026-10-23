import { defineTool, input, optional, string } from '@usemcpkit/core';
import { PAGE, PER_PAGE, PROJECT } from '../const';

export const listPipelines = defineTool({
  name: 'list_pipelines',
  description: 'List CI pipelines of a project, newest first.',
  input: input({
    project: PROJECT,
    ref: optional(string('Branch or tag name')),
    status: optional(string('Pipeline status, for example running, success or failed')),
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/projects/{project}/pipelines',
    query: ['ref', 'status', 'per_page', 'page'],
  },
  response: {
    fields: { id: 'id', status: 'status', ref: 'ref', sha: 'sha', url: 'web_url', created_at: 'created_at' },
  },
});
