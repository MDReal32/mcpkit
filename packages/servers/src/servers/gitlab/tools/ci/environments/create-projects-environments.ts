import { defineTool } from "@usemcpkit/core";

export const ciEnvironmentsCreateProjectsEnvironments = defineTool({
  name: "ci:environments:create_projects_environments",
  description: "Create an environment. Creates an environment for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the environment.",
      },
      external_url: {
        type: "string",
        description: "URL to link to for the environment.",
      },
      tier: {
        type: "string",
        description: "Tier of the environment.",
        enum: ["production", "staging", "testing", "development", "other"],
      },
      cluster_agent_id: {
        type: "integer",
        description:
          "ID of the cluster agent to associate with the environment. When updating an environment, set to `null` to remove it.",
      },
      kubernetes_namespace: {
        type: "string",
        description:
          "Kubernetes namespace to associate with the environment. When updating an environment, set to `null` to remove it.",
      },
      flux_resource_path: {
        type: "string",
        description:
          "Flux resource path to associate with the environment, for example `helm.toolkit.fluxcd.io/v2/namespaces/gitlab-agent/helmreleases/gitlab-agent`. When updating an environment, set to `null` to remove it.",
      },
      description: {
        type: "string",
        description: "Description of the environment.",
      },
      auto_stop_setting: {
        type: "string",
        description: "Auto stop setting for the environment.",
        enum: ["always", "with_action"],
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/environments",
    body: [
      "name",
      "external_url",
      "tier",
      "cluster_agent_id",
      "kubernetes_namespace",
      "flux_resource_path",
      "description",
      "auto_stop_setting",
    ],
  },
});
