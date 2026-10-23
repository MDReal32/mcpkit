import { defineTool } from '@usemcpkit/core';

export const aiCodeSuggestionsCreateCodeSuggestionsEnabled = defineTool({
  name: 'ai:code_suggestions:create_code_suggestions_enabled',
  description:
    'Validate status of Code Suggestions. Validates the status Code Suggestions for a specified project. This checks if the project has `code_suggestions` enabled or if an ancestor group has the Code Suggestions add-on enabled.',
  input: {
    type: 'object',
    properties: {
      project_path: {
        type: 'string',
        description: 'Path of the project.',
      },
    },
    required: ['project_path'],
  },
  request: {
    method: 'POST',
    path: '/code_suggestions/enabled',
    body: ['project_path'],
  },
});
