import { defineTool } from '@usemcpkit/core';

export const projectsProjectGoogleCloudIntegrationGetProjectsGoogleCloudSetupIntegrationsSh = defineTool({
  name: 'projects:project_google_cloud_integration:get_projects_google_cloud_setup_integrations_sh',
  description:
    'Retrieve setup script for Google Cloud integration. Retrieves the setup script for Google Cloud integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      enable_google_cloud_artifact_registry: {
        type: 'boolean',
        description: 'If `true`, indicates that the Google Artifact Management integration should be enabled.',
      },
      google_cloud_artifact_registry_project_id: {
        type: 'string',
        description: 'Project ID for the Google Cloud Artifact Registry.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/google_cloud/setup/integrations.sh',
    query: ['enable_google_cloud_artifact_registry', 'google_cloud_artifact_registry_project_id'],
  },
});
