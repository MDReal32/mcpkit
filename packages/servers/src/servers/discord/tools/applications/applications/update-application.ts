import { defineTool } from "@usemcpkit/core";

export const applicationsApplicationsUpdateApplication = defineTool({
  name: "applications:applications:update_application",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      description: {
        type: "object",
        properties: {
          default: {
            type: "string",
          },
          localizations: {
            type: "object",
          },
        },
        required: ["default"],
      },
      icon: {
        type: "string",
      },
      cover_image: {
        type: "string",
      },
      team_id: {},
      flags: {
        type: "integer",
      },
      interactions_endpoint_url: {
        type: "string",
      },
      explicit_content_filter: {},
      max_participants: {
        type: "integer",
      },
      type: {},
      tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
      custom_install_url: {
        type: "string",
      },
      install_params: {
        type: "object",
        properties: {
          scopes: {
            type: "array",
            items: {
              type: "string",
              enum: ["applications.commands", "bot"],
            },
          },
          permissions: {
            type: "integer",
          },
        },
      },
      role_connections_verification_url: {
        type: "string",
      },
      integration_types_config: {
        type: "object",
      },
      event_webhooks_status: {},
      event_webhooks_url: {
        type: "string",
        description: "Event webhooks URL for the app to receive webhook events",
      },
      event_webhooks_types: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "APPLICATION_AUTHORIZED",
            "APPLICATION_DEAUTHORIZED",
            "ENTITLEMENT_CREATE",
            "ENTITLEMENT_DELETE",
            "ENTITLEMENT_UPDATE",
            "GAME_DIRECT_MESSAGE_CREATE",
            "GAME_DIRECT_MESSAGE_DELETE",
            "GAME_DIRECT_MESSAGE_UPDATE",
            "LOBBY_MESSAGE_CREATE",
            "LOBBY_MESSAGE_DELETE",
            "LOBBY_MESSAGE_UPDATE",
            "QUEST_USER_ENROLLMENT",
          ],
        },
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "PATCH",
    path: "/applications/{application_id}",
    body: [
      "description",
      "icon",
      "cover_image",
      "team_id",
      "flags",
      "interactions_endpoint_url",
      "explicit_content_filter",
      "max_participants",
      "type",
      "tags",
      "custom_install_url",
      "install_params",
      "role_connections_verification_url",
      "integration_types_config",
      "event_webhooks_status",
      "event_webhooks_url",
      "event_webhooks_types",
    ],
  },
});
