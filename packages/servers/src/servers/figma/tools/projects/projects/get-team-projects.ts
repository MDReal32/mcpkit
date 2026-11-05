import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetTeamProjects = defineTool({
  name: "projects:projects:get_team_projects",
  description:
    '[Deprecated] [Deprecated] Get projects in a team. Deprecated in favor of Get top-level folders in a team. You can use this endpoint to get a list of the top-level Projects (now called "folders") within the specified team. This will only return projects visible to the authenticated user or owner of the developer token. Note: it is not currently possible to programmatically obtain the team id of a user just from a token. To obtain a team id, navig…',
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "ID of the team to list projects from",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v1/teams/{team_id}/projects",
  },
});
