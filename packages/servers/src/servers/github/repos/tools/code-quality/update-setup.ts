import { defineTool } from '@usemcpkit/core';

export const codeQualityUpdateSetup = defineTool({
  name: 'code_quality:update_setup',
  description: 'Update a code quality setup configuration. Updates a code quality setup configuration.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      state: {
        type: 'string',
        description: 'The desired state of code quality setup.',
        enum: ['configured', 'not-configured'],
      },
      runner_type: {
        type: 'string',
        description: 'Runner type to be used.',
        enum: ['standard', 'labeled'],
      },
      runner_label: {
        type: 'string',
        description: 'Runner label to be used if the runner type is labeled.',
      },
      languages: {
        type: 'array',
        description: 'Languages to be analyzed.',
        items: {
          type: 'string',
          enum: ['csharp', 'go', 'java-kotlin', 'javascript-typescript', 'python', 'ruby'],
        },
      },
      ai_findings_option: {
        type: 'string',
        description: 'Whether AI findings run for Code Quality on this repository.',
        enum: ['disabled', 'on_push'],
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/code-quality/setup',
    body: ['state', 'runner_type', 'runner_label', 'languages', 'ai_findings_option'],
  },
});
