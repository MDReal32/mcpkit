import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsGithub = defineTool({
  name: 'projects:integrations:update_groups_integrations_github',
  description: 'Create or update the Github integration. Creates or updates the Github integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      token: {
        type: 'string',
        description: 'GitHub API token with `repo:status` OAuth scope.',
      },
      repository_url: {
        type: 'string',
        description: 'GitHub repository URL.',
      },
      static_context: {
        type: 'boolean',
        description: 'Append the hostname of your GitLab instance to the status check name.',
      },
      pipeline_events: {
        type: 'boolean',
        description: 'Trigger event when a pipeline status changes.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'token', 'repository_url'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/integrations/github',
    body: ['token', 'repository_url', 'static_context', 'pipeline_events', 'use_inherited_settings'],
  },
});
