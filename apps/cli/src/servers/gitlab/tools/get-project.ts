import { defineTool, input } from '@usemcpkit/core';
import { PROJECT, PROJECT_FIELDS } from '../const';

export const getProject = defineTool({
  name: 'get_project',
  description: 'Get details of a project.',
  input: input({ project: PROJECT }),
  request: { method: 'GET', path: '/projects/{project}' },
  response: { fields: { ...PROJECT_FIELDS, open_issues: 'open_issues_count', visibility: 'visibility' } },
});
