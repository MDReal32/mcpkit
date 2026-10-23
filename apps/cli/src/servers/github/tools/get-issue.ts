import { defineTool, input, number } from '@mcpkit/core';
import { ISSUE_FIELDS, REPO_PARAMS } from '../const';

export const getIssue = defineTool({
  name: 'get_issue',
  description: 'Get a single issue with its body and labels.',
  input: input({ ...REPO_PARAMS, issue_number: number('Issue number') }),
  request: { method: 'GET', path: '/repos/{owner}/{repo}/issues/{issue_number}' },
  response: { fields: { ...ISSUE_FIELDS, body: 'body', labels: 'labels[].name' } },
});
