import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateRegistrationTokenForRepo = defineTool({
  name: "actions:actions:create_registration_token_for_repo",
  description:
    "Create a registration token for a repository. Returns a token that you can pass to the `config` script. The token expires after one hour.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/runners/registration-token",
  },
});
