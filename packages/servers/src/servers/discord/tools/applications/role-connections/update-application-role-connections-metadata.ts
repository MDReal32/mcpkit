import { defineTool } from "@usemcpkit/core";

export const applicationsRoleConnectionsUpdateApplicationRoleConnectionsMetadata = defineTool({
  name: "applications:role_connections:update_application_role_connections_metadata",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
              type: "integer",
            },
            key: {
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
          },
          required: ["type", "key", "name", "description"],
        },
      },
    },
    required: ["application_id", "body"],
  },
  request: {
    method: "PUT",
    path: "/applications/{application_id}/role-connections/metadata",
    bodyArg: "body",
  },
});
