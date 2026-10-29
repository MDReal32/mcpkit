import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsGetApplicationCommand = defineTool({
  name: "applications:commands:get_application_command",
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
    method: "GET",
    path: "/applications/{application_id}/commands/{command_id}",
  },
});
