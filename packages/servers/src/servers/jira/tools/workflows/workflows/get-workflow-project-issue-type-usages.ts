import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowsGetWorkflowProjectIssueTypeUsages = defineTool({
  name: 'workflows:workflows:get_workflow_project_issue_type_usages',
  description:
    'Get issue types in a project that are using a given workflow. Returns a page of issue types using a given workflow within a project.',
  input: {
    type: 'object',
    properties: {
      workflowId: {
        type: 'string',
        description: 'The workflow ID',
      },
      projectId: {
        type: 'integer',
        description: 'The project ID',
      },
      nextPageToken: {
        type: 'string',
        description: 'The cursor for pagination',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of results to return. Must be an integer between 1 and 200.',
      },
    },
    required: ['workflowId', 'projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflow/{workflowId}/project/{projectId}/issueTypeUsages',
    query: ['nextPageToken', 'maxResults'],
  },
});
