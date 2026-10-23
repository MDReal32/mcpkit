import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsServicesIrker = defineTool({
  name: "projects:integrations:update_projects_services_irker",
  description: "Create or update the Irker integration. Creates or updates the Irker integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      server_host: {
        type: "string",
        description: "irker daemon hostname. The default value is `localhost`.",
      },
      server_port: {
        type: "integer",
        description: "irker daemon port. The default value is `6659`.",
      },
      default_irc_uri: {
        type: "string",
        description: "URI to add before each recipient. The default value is `irc://irc.network.net:6697/`.",
      },
      recipients: {
        type: "string",
        description: "Comma-separated list of channels or email addresses.",
      },
      colorize_messages: {
        type: "boolean",
        description: "Colorize messages",
      },
      push_events: {
        type: "boolean",
        description: "Trigger event for pushes to the repository.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "recipients"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/services/irker",
    body: [
      "server_host",
      "server_port",
      "default_irc_uri",
      "recipients",
      "colorize_messages",
      "push_events",
      "use_inherited_settings",
    ],
  },
});
