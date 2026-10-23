import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoCreateAiLlmGitCommand = defineTool({
  name: 'ai:gitlab_duo:create_ai_llm_git_command',
  description: 'Generate Git commands from natural text. Generates Git commands from natural language input',
  input: {
    type: 'object',
    properties: {
      prompt: {
        type: 'string',
        description: 'Prompt used to generate the Git commands.',
      },
    },
    required: ['prompt'],
  },
  request: {
    method: 'POST',
    path: '/ai/llm/git_command',
    body: ['prompt'],
  },
});
