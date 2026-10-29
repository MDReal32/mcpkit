import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsListApplicationCommands = defineTool({
  name: "applications:commands:list_application_commands",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      with_localizations: {
        type: "boolean",
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/commands",
    query: ["with_localizations"],
  },
});
