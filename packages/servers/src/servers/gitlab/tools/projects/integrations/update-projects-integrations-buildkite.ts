import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsIntegrationsBuildkite = defineTool({
  name: 'projects:integrations:update_projects_integrations_buildkite',
  description: 'Create or update the Buildkite integration. Creates or updates the Buildkite integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      project_url: {
        type: 'string',
        description: 'Pipeline URL (for example, `https://buildkite.com/example/pipeline`).',
      },
      token: {
        type: 'string',
        description: 'Token you get after you create a Buildkite pipeline with a GitLab repository.',
      },
      enable_ssl_verification: {
        type: 'boolean',
        description: 'DEPRECATED: This parameter has no effect because SSL verification is always enabled.',
      },
      push_events: {
        type: 'boolean',
        description: 'Trigger event for pushes to the repository.',
      },
      merge_requests_events: {
        type: 'boolean',
        description: 'Trigger event when a merge request is created, updated, or merged.',
      },
      tag_push_events: {
        type: 'boolean',
        description: 'Trigger event for new tags pushed to the repository.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'project_url', 'token'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/integrations/buildkite',
    body: [
      'project_url',
      'token',
      'enable_ssl_verification',
      'push_events',
      'merge_requests_events',
      'tag_push_events',
      'use_inherited_settings',
    ],
  },
});
