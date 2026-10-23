import { defineTool, input } from '@mcpkit/core';
import { MERGE_REQUEST_FIELDS, MERGE_REQUEST_IID, PROJECT } from '../const';

export const getMergeRequest = defineTool({
  name: 'get_merge_request',
  description: 'Get a merge request with its description and merge status.',
  input: input({ project: PROJECT, merge_request_iid: MERGE_REQUEST_IID }),
  request: { method: 'GET', path: '/projects/{project}/merge_requests/{merge_request_iid}' },
  response: {
    fields: {
      ...MERGE_REQUEST_FIELDS,
      description: 'description',
      merge_status: 'detailed_merge_status',
      has_conflicts: 'has_conflicts',
    },
  },
});
