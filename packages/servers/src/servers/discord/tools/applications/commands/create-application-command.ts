import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsCreateApplicationCommand = defineTool({
  name: "applications:commands:create_application_command",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
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
          properties: {
            type: {
              type: "integer",
              enum: [6],
            },
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
            required: {
              type: "boolean",
            },
            file_types: {
              type: "array",
              items: {
                type: "string",
              },
            },
            channel_types: {
              type: "array",
              items: {
                type: "integer",
              },
            },
            autocomplete: {
              type: "boolean",
            },
            choices: {
              type: "array",
              items: {
                type: "object",
              },
            },
            min_value: {
              type: "number",
            },
            max_value: {
              type: "number",
            },
            min_length: {
              type: "integer",
            },
            max_length: {
              type: "integer",
            },
            options: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
          required: ["type", "name", "description"],
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
        description: "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      },
      type: {},
    },
    required: ["application_id", "name"],
  },
  request: {
    method: "POST",
    path: "/applications/{application_id}/commands",
    body: [
      "name",
      "name_localizations",
      "description",
      "description_localizations",
      "options",
      "default_member_permissions",
      "dm_permission",
      "contexts",
      "integration_types",
      "handler",
      "type",
    ],
  },
});
