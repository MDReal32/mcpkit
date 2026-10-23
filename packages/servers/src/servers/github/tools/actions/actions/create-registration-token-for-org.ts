import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateRegistrationTokenForOrg = defineTool({
  name: "actions:actions:create_registration_token_for_org",
  description:
    "Create a registration token for an organization. Returns a token that you can pass to the `config` script. The token expires after one hour.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/actions/runners/registration-token",
  },
});
