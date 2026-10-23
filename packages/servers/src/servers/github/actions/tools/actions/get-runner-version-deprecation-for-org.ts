import { defineTool } from '@usemcpkit/core';

export const actionsGetRunnerVersionDeprecationForOrg = defineTool({
  name: 'actions:get_runner_version_deprecation_for_org',
  description:
    'Get runner version end-of-life schedule for an organization. Gets the end-of-life schedule for a specific runner version in an organization. Returns the runner version and the dates when registration and runtime support will end.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      version: {
        type: 'string',
        description: 'The runner version to look up.',
      },
    },
    required: ['org', 'version'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/runners/deprecations/{version}',
  },
});
