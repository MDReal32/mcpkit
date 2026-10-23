import { defineTool } from '@usemcpkit/core';

export const actionsGenerateRunnerJitconfigForOrg = defineTool({
  name: 'actions:generate_runner_jitconfig_for_org',
  description:
    'Create configuration for a just-in-time runner for an organization. Generates a configuration that can be passed to the runner application at startup.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the new runner.',
      },
      runner_group_id: {
        type: 'integer',
        description: 'The ID of the runner group to register the runner to.',
      },
      labels: {
        type: 'array',
        description:
          'The names of the custom labels to add to the runner. **Minimum items**: 1. **Maximum items**: 100.',
        items: {
          type: 'string',
        },
      },
      work_folder: {
        type: 'string',
        description: 'The working directory to be used for job execution, relative to the runner install directory.',
        default: '_work',
      },
    },
    required: ['org', 'name', 'runner_group_id', 'labels'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/actions/runners/generate-jitconfig',
    body: ['name', 'runner_group_id', 'labels', 'work_folder'],
  },
});
