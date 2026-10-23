import { defineTool } from "@usemcpkit/core";

export const appsCodespacesPreFlightWithRepoForAuthenticatedUser = defineTool({
  name: "apps:codespaces:pre_flight_with_repo_for_authenticated_user",
  description:
    "Get default attributes for a codespace. Gets the default attributes for codespaces created by the user with the repository.",
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
      ref: {
        type: "string",
        description:
          "The branch or commit to check for a default devcontainer path. If not specified, the default branch will be checked.",
      },
      client_ip: {
        type: "string",
        description: "An alternative IP for default location auto-detection, such as when proxying a request.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/codespaces/new",
    query: ["ref", "client_ip"],
  },
});
