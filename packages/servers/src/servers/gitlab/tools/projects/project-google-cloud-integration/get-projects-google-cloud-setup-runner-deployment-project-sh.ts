import { defineTool } from "@usemcpkit/core";

export const projectsProjectGoogleCloudIntegrationGetProjectsGoogleCloudSetupRunnerDeploymentProjectSh = defineTool({
  name: "projects:project_google_cloud_integration:get_projects_google_cloud_setup_runner_deployment_project_sh",
  description:
    "Retrieve configuration script for Google Cloud runner provisioning. Retrieves the configuration script for Google Cloud runner provisioning.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      google_cloud_project_id: {
        type: "string",
        description: "ID of the Google Cloud project.",
      },
    },
    required: ["id", "google_cloud_project_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/google_cloud/setup/runner_deployment_project.sh",
    query: ["google_cloud_project_id"],
  },
});
