import { defineTool, input, optional, string } from '@usemcpkit/core';
import { MERGE_REQUEST_FIELDS, MERGE_REQUEST_STATE_FILTER, PAGE, PER_PAGE, PROJECT } from '../../const';

export const listMergeRequests = defineTool({
  name: 'merge_request:list',
  description: 'List merge requests in a project.',
  input: input({
    project: PROJECT,
    state: MERGE_REQUEST_STATE_FILTER,
    target_branch: optional(string('Only merge requests into this branch')),
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/projects/{project}/merge_requests',
    query: ['state', 'target_branch', 'per_page', 'page'],
  },
  response: { fields: MERGE_REQUEST_FIELDS },
});
