import { defineTool, input, optional, string } from '@mcpkit/core';
import { PROJECT } from '../const';

export const createIssue = defineTool({
  name: 'create_issue',
  description: 'Create an issue in a project.',
  input: input({
    project: PROJECT,
    title: string('Issue title'),
    description: optional(string('Issue description (markdown)')),
    labels: optional(string('Comma-separated label names')),
  }),
  request: { method: 'POST', path: '/projects/{project}/issues', body: ['title', 'description', 'labels'] },
  response: { fields: { iid: 'iid', url: 'web_url' } },
});
