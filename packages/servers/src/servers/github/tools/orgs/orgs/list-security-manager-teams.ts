import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListSecurityManagerTeams = defineTool({
  name: "orgs:orgs:list_security_manager_teams",
  description:
    '[Deprecated] List security manager teams. > [!WARNING] > **Closing down notice:** This operation is closing down and will be removed starting January 1, 2026. Please use the "Organization Roles" endpoints instead.',
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
    method: "GET",
    path: "/orgs/{org}/security-managers",
  },
});
