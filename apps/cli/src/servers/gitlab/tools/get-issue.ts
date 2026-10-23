import { defineTool, input } from '@mcpkit/core';
import { ISSUE_FIELDS, ISSUE_IID, PROJECT } from '../const';

export const getIssue = defineTool({
  name: 'get_issue',
  description: 'Get an issue with its description.',
  input: input({ project: PROJECT, issue_iid: ISSUE_IID }),
  request: { method: 'GET', path: '/projects/{project}/issues/{issue_iid}' },
  response: { fields: { ...ISSUE_FIELDS, description: 'description' } },
});
