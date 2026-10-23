import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningUpdateDefaultSetup = defineTool({
  name: 'security:code_scanning:update_default_setup',
  description:
    'Update a code scanning default setup configuration. Updates a code scanning default setup configuration.',
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
        description: 'The desired state of code scanning default setup.',
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
      query_suite: {
        type: 'string',
        description: 'CodeQL query suite to be used.',
        enum: ['default', 'extended'],
      },
      threat_model: {
        type: 'string',
        description:
          'Threat model to be used for code scanning analysis. Use `remote` to analyze only network sources and `remote_and_local` to include local sources like filesystem access, command-line arguments, database reads, environment variable and standard input.',
        enum: ['remote', 'remote_and_local'],
      },
      languages: {
        type: 'array',
        description: 'CodeQL languages to be analyzed.',
        items: {
          type: 'string',
          enum: ['actions', 'c-cpp', 'csharp', 'go', 'java-kotlin', 'javascript-typescript', 'python', 'ruby', 'swift'],
        },
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/code-scanning/default-setup',
    body: ['state', 'runner_type', 'runner_label', 'query_suite', 'threat_model', 'languages'],
  },
});
