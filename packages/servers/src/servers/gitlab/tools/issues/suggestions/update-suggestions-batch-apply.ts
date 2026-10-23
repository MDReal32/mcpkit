import { defineTool } from '@usemcpkit/core';

export const issuesSuggestionsUpdateSuggestionsBatchApply = defineTool({
  name: 'issues:suggestions:update_suggestions_batch_apply',
  description:
    'Apply multiple suggestions to a merge request. Applies multiple suggested patches in a merge request. You must have the Developer, Maintainer, or Owner role.',
  input: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description: 'IDs of suggestions to apply.',
        items: {
          type: 'integer',
        },
      },
      commit_message: {
        type: 'string',
        description:
          "Custom commit message to use instead of the default generated message or the project's default message.",
      },
    },
    required: ['ids'],
  },
  request: {
    method: 'PUT',
    path: '/suggestions/batch_apply',
    body: ['ids', 'commit_message'],
  },
});
