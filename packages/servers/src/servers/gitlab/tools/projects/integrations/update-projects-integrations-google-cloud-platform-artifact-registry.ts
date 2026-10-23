import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsGoogleCloudPlatformArtifactRegistry = defineTool({
  name: "projects:integrations:update_projects_integrations_google_cloud_platform_artifact_registry",
  description:
    "Create or update the Google Cloud Platform Artifact Registry integration. Creates or updates the Google Cloud Platform Artifact Registry integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      artifact_registry_project_id: {
        type: "string",
        description: "ID of the Google Cloud project.",
      },
      artifact_registry_repositories: {
        type: "string",
        description: "Repository of Artifact Registry.",
      },
      artifact_registry_location: {
        type: "string",
        description: "Location of the Artifact Registry repository.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "artifact_registry_project_id", "artifact_registry_repositories", "artifact_registry_location"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/google-cloud-platform-artifact-registry",
    body: [
      "artifact_registry_project_id",
      "artifact_registry_repositories",
      "artifact_registry_location",
      "use_inherited_settings",
    ],
  },
});
