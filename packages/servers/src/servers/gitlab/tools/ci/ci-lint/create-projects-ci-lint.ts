import { defineTool } from '@usemcpkit/core';

export const ciCiLintCreateProjectsCiLint = defineTool({
  name: 'ci:ci_lint:create_projects_ci_lint',
  description:
    'Validate a CI/CD configuration. Validates a provided CI/CD configuration in the context of a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      content: {
        type: 'string',
        description: 'CI/CD configuration content.',
      },
      dry_run: {
        type: 'boolean',
        description: 'If `true`, runs a pipeline creation simulation. If `false`, runs only a static check.',
        default: false,
      },
      include_jobs: {
        type: 'boolean',
        description: 'If `true`, includes the list of jobs that would exist in a static check or pipeline simulation.',
      },
      ref: {
        type: 'string',
        description:
          "If `dry_run` is `true`, sets the branch or tag to use to validate the CI/CD YAML configuration. Defaults to the project's default branch.",
      },
    },
    required: ['id', 'content'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ci/lint',
    body: ['content', 'dry_run', 'include_jobs', 'ref'],
  },
});
