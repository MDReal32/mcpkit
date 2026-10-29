import { defineTool } from "@usemcpkit/core";

export const guildsRolesGuildRoleMemberCounts = defineTool({
  name: "guilds:roles:guild_role_member_counts",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/roles/member-counts",
  },
});
