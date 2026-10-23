import { defineTool } from "@usemcpkit/core";

export const appsCodespacesStopInOrganization = defineTool({
  name: "apps:codespaces:stop_in_organization",
  description: "Stop a codespace for an organization user. Stops a user's codespace.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      codespace_name: {
        type: "string",
        description: "The name of the codespace.",
      },
    },
    required: ["org", "username", "codespace_name"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/members/{username}/codespaces/{codespace_name}/stop",
  },
});
