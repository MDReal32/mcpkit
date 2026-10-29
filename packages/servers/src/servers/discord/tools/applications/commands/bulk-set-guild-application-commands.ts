import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsBulkSetGuildApplicationCommands = defineTool({
  name: "applications:commands:bulk_set_guild_application_commands",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      guild_id: {
        type: "string",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            name_localizations: {
              type: "object",
            },
            description: {
              type: "string",
            },
            description_localizations: {
              type: "object",
            },
            options: {
              type: "array",
              items: {
                type: "object",
              },
            },
            default_member_permissions: {
              type: "integer",
            },
            dm_permission: {
              type: "boolean",
            },
            contexts: {
              type: "array",
              items: {
                type: "integer",
              },
            },
            integration_types: {
              type: "array",
              items: {
                type: "integer",
              },
            },
            handler: {
              description:
                "Determines whether the interaction is handled by the app's interactions handler or by Discord",
            },
            type: {},
            id: {},
          },
          required: ["name"],
        },
      },
    },
    required: ["application_id", "guild_id", "body"],
  },
  request: {
    method: "PUT",
    path: "/applications/{application_id}/guilds/{guild_id}/commands",
    bodyArg: "body",
  },
});
