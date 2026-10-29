import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsDeleteApplicationCommand = defineTool({
  name: "applications:commands:delete_application_command",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      command_id: {
        type: "string",
      },
    },
    required: ["application_id", "command_id"],
  },
  request: {
    method: "DELETE",
    path: "/applications/{application_id}/commands/{command_id}",
  },
});
