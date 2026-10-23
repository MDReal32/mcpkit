import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsGoogleCloudPlatformWorkloadIdentityFederation = defineTool({
  name: "projects:integrations:update_groups_integrations_google_cloud_platform_workload_identity_federation",
  description:
    "Create or update the Google Cloud Platform Workload Identity Federation integration. Creates or updates the Google Cloud Platform Workload Identity Federation integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      workload_identity_federation_project_id: {
        type: "string",
        description: "Google Cloud project ID for the Workload Identity Federation.",
      },
      workload_identity_federation_project_number: {
        type: "string",
        description: "Google Cloud project number for the Workload Identity Federation.",
      },
      workload_identity_pool_id: {
        type: "string",
        description: "ID of the Workload Identity Pool.",
      },
      workload_identity_pool_provider_id: {
        type: "string",
        description: "ID of the Workload Identity Pool provider.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: [
      "id",
      "workload_identity_federation_project_id",
      "workload_identity_federation_project_number",
      "workload_identity_pool_id",
      "workload_identity_pool_provider_id",
    ],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/google-cloud-platform-workload-identity-federation",
    body: [
      "workload_identity_federation_project_id",
      "workload_identity_federation_project_number",
      "workload_identity_pool_id",
      "workload_identity_pool_provider_id",
      "use_inherited_settings",
    ],
  },
});
