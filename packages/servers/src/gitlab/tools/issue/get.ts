import { defineTool, input } from '@usemcpkit/core';
import { ISSUE_FIELDS, ISSUE_IID, PROJECT } from '../../const';

export const getIssue = defineTool({
  name: 'issue:get',
  description: 'Get an issue with its description.',
  input: input({ project: PROJECT, issue_iid: ISSUE_IID }),
  request: { method: 'GET', path: '/projects/{project}/issues/{issue_iid}' },
  response: { fields: { ...ISSUE_FIELDS, description: 'description' } },
});
