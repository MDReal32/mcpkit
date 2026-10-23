import { defineTool } from '@usemcpkit/core';

export const checksSetSuitesPreferences = defineTool({
  name: 'checks:set_suites_preferences',
  description:
    'Update repository preferences for check suites. Changes the default automatic flow when creating check suites. By default, a check suite is automatically created each time code is pushed to a repository. When you disable the automatic creation of check suites, you can manually Create a check suite. You must have admin permissions in the repository to set preferences for check suites.',
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
      auto_trigger_checks: {
        type: 'array',
        description:
          'Enables or disables automatic creation of CheckSuite events upon pushes to the repository. Enabled by default.',
        items: {
          type: 'object',
          properties: {
            app_id: {
              type: 'integer',
              description: 'The `id` of the GitHub App.',
            },
            setting: {
              type: 'boolean',
              description:
                'Set to `true` to enable automatic creation of CheckSuite events upon pushes to the repository, or `false` to disable them.',
              default: true,
            },
          },
          required: ['app_id', 'setting'],
        },
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/check-suites/preferences',
    body: ['auto_trigger_checks'],
  },
});
