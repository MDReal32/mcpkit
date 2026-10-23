import { array, defineTool, input, optional, string } from '@usemcpkit/core';
import { REPO_PARAMS } from '../const';

export const createIssue = defineTool({
  name: 'create_issue',
  description: 'Create an issue in a repository.',
  input: input({
    ...REPO_PARAMS,
    title: string('Issue title'),
    body: optional(string('Issue body (markdown)')),
    labels: optional(array({ type: 'string' }, 'Label names')),
  }),
  request: { method: 'POST', path: '/repos/{owner}/{repo}/issues', body: ['title', 'body', 'labels'] },
  response: { fields: { number: 'number', url: 'html_url' } },
});
