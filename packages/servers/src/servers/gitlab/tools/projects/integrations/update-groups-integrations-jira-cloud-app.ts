import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsJiraCloudApp = defineTool({
  name: "projects:integrations:update_groups_integrations_jira_cloud_app",
  description: "Create or update the Jira Cloud App integration. Creates or updates the Jira Cloud App integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      jira_cloud_app_service_ids: {
        type: "string",
        description: "Copy and paste your JSM Service ID here. Use comma (,) to separate multiple IDs.",
      },
      jira_cloud_app_enable_deployment_gating: {
        type: "boolean",
        description: "Enable to approve or reject blocked GitLab deployments from Jira Service Management.",
      },
      jira_cloud_app_deployment_gating_environments: {
        type: "string",
        description:
          "Enter the environment (production,staging,testing,development) where you want to enable deployment gating. Use comma (,) to separate multiple environments.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/jira-cloud-app",
    body: [
      "jira_cloud_app_service_ids",
      "jira_cloud_app_enable_deployment_gating",
      "jira_cloud_app_deployment_gating_environments",
      "use_inherited_settings",
    ],
  },
});
