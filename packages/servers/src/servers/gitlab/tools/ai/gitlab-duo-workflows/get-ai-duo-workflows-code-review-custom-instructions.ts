import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsCodeReviewCustomInstructions = defineTool({
  name: 'ai:gitlab_duo_workflows:get_ai_duo_workflows_code_review_custom_instructions',
  description:
    'Fetch the Duo Code Review custom instructions for a merge request. Fetch all Duo Code Review custom instructions for a merge request.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
    },
    required: ['project_id', 'merge_request_iid'],
  },
  request: {
    method: 'GET',
    path: '/ai/duo_workflows/code_review/custom_instructions',
    query: ['project_id', 'merge_request_iid'],
  },
});
