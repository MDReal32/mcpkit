import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsDroneCi = defineTool({
  name: "projects:integrations:update_groups_integrations_drone_ci",
  description: "Create or update the Drone Ci integration. Creates or updates the Drone Ci integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      enable_ssl_verification: {
        type: "boolean",
        description: "Enable SSL verification. Defaults to `true` (enabled).",
      },
      drone_url: {
        type: "string",
        description: "Drone CI URL (for example, `http://drone.example.com`).",
      },
      token: {
        type: "string",
        description: "Drone CI token.",
      },
      push_events: {
        type: "boolean",
        description: "Trigger event for pushes to the repository.",
      },
      merge_requests_events: {
        type: "boolean",
        description: "Trigger event when a merge request is created, updated, or merged.",
      },
      tag_push_events: {
        type: "boolean",
        description: "Trigger event for new tags pushed to the repository.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "drone_url", "token"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/drone-ci",
    body: [
      "enable_ssl_verification",
      "drone_url",
      "token",
      "push_events",
      "merge_requests_events",
      "tag_push_events",
      "use_inherited_settings",
    ],
  },
});
