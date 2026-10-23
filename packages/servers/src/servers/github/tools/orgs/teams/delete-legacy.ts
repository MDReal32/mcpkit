import { defineTool } from "@usemcpkit/core";

export const orgsTeamsDeleteLegacy = defineTool({
  name: "orgs:teams:delete_legacy",
  description:
    "[Deprecated] Delete a team (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new Delete a team endpoint.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "integer",
        description: "The unique identifier of the team.",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "DELETE",
    path: "/teams/{team_id}",
  },
});
