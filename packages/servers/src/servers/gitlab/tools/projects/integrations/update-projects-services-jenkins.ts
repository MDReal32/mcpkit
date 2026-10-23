import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateProjectsServicesJenkins = defineTool({
  name: 'projects:integrations:update_projects_services_jenkins',
  description: 'Create or update the Jenkins integration. Creates or updates the Jenkins integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      enable_ssl_verification: {
        type: 'boolean',
        description: 'Enable SSL verification. Defaults to `true` (enabled).',
      },
      jenkins_url: {
        type: 'string',
        description: 'URL of the Jenkins server.',
      },
      project_name: {
        type: 'string',
        description: 'Name of the Jenkins project.',
      },
      username: {
        type: 'string',
        description: 'Username of the Jenkins server.',
      },
      password: {
        type: 'string',
        description: 'Password of the Jenkins server.',
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
    required: ['id', 'jenkins_url', 'project_name'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/services/jenkins',
    body: [
      'enable_ssl_verification',
      'jenkins_url',
      'project_name',
      'username',
      'password',
      'push_events',
      'merge_requests_events',
      'tag_push_events',
      'use_inherited_settings',
    ],
  },
});
