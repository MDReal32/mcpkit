import { defineTool } from "@usemcpkit/core";

export const applicationsRoleConnectionsGetApplicationRoleConnectionsMetadata = defineTool({
  name: "applications:role_connections:get_application_role_connections_metadata",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/role-connections/metadata",
  },
});
