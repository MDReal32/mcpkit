import { defineTool } from "@usemcpkit/core";

export const ciRunnersCreateRunnersResetAuthenticationToken = defineTool({
  name: "ci:runners:create_runners_reset_authentication_token",
  description: "Reset an authentication token for a runner. Resets the authentication token for a specified runner.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the runner.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/runners/{id}/reset_authentication_token",
  },
});
