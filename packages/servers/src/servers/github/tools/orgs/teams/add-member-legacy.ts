import { defineTool } from "@usemcpkit/core";

export const orgsTeamsAddMemberLegacy = defineTool({
  name: "orgs:teams:add_member_legacy",
  description:
    '[Deprecated] Add team member (Legacy). The "Add team member" endpoint (described below) is closing down.',
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "integer",
        description: "The unique identifier of the team.",
      },
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["team_id", "username"],
  },
  request: {
    method: "PUT",
    path: "/teams/{team_id}/members/{username}",
  },
});
