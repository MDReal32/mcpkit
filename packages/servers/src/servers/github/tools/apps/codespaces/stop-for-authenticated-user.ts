import { defineTool } from "@usemcpkit/core";

export const appsCodespacesStopForAuthenticatedUser = defineTool({
  name: "apps:codespaces:stop_for_authenticated_user",
  description: "Stop a codespace for the authenticated user. Stops a user's codespace.",
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
    method: "POST",
    path: "/user/codespaces/{codespace_name}/stop",
  },
});
