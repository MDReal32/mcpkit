import { defineTool } from "@usemcpkit/core";

export const appsCodespacesCreateForAuthenticatedUser = defineTool({
  name: "apps:codespaces:create_for_authenticated_user",
  description:
    "Create a codespace for the authenticated user. Creates a new codespace, owned by the authenticated user.",
  input: {
    type: "object",
    properties: {
      repository_id: {
        type: "integer",
        description: "Repository id for this codespace",
      },
      ref: {
        type: "string",
        description: "Git ref (typically a branch name) for this codespace",
      },
      location: {
        type: "string",
        description:
          "The requested location for a new codespace. Best efforts are made to respect this upon creation. Assigned by IP if not provided.",
      },
      geo: {
        type: "string",
        description:
          "The geographic area for this codespace. If not specified, the value is assigned by IP. This property replaces `location`, which is closing down.",
        enum: ["EuropeWest", "SoutheastAsia", "UsEast", "UsWest"],
      },
      client_ip: {
        type: "string",
        description: "IP for location auto-detection when proxying a request",
      },
      machine: {
        type: "string",
        description: "Machine type to use for this codespace",
      },
      devcontainer_path: {
        type: "string",
        description: "Path to devcontainer.json config to use for this codespace",
      },
      multi_repo_permissions_opt_out: {
        type: "boolean",
        description: "Whether to authorize requested permissions from devcontainer.json",
      },
      working_directory: {
        type: "string",
        description: "Working directory for this codespace",
      },
      idle_timeout_minutes: {
        type: "integer",
        description: "Time in minutes before codespace stops from inactivity",
      },
      display_name: {
        type: "string",
        description: "Display name for this codespace",
      },
      retention_period_minutes: {
        type: "integer",
        description:
          "Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days).",
      },
      pull_request: {
        type: "object",
        description: "Pull request number for this codespace",
        properties: {
          pull_request_number: {
            type: "integer",
            description: "Pull request number",
          },
          repository_id: {
            type: "integer",
            description: "Repository id for this codespace",
          },
        },
        required: ["pull_request_number", "repository_id"],
      },
    },
  },
  request: {
    method: "POST",
    path: "/user/codespaces",
    body: [
      "repository_id",
      "ref",
      "location",
      "geo",
      "client_ip",
      "machine",
      "devcontainer_path",
      "multi_repo_permissions_opt_out",
      "working_directory",
      "idle_timeout_minutes",
      "display_name",
      "retention_period_minutes",
      "pull_request",
    ],
  },
});
