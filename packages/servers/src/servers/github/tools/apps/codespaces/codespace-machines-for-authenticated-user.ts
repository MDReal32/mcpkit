import { defineTool } from "@usemcpkit/core";

export const appsCodespacesCodespaceMachinesForAuthenticatedUser = defineTool({
  name: "apps:codespaces:codespace_machines_for_authenticated_user",
  description: "List machine types for a codespace. List the machine types a codespace can transition to use.",
  input: {
    type: "object",
    properties: {
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
    },
    required: ["codespace_name"],
  },
  request: {
    method: "GET",
    path: "/user/codespaces/{codespace_name}/machines",
  },
});
