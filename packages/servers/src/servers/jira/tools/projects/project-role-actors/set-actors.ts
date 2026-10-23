import { defineTool } from "@usemcpkit/core";

export const projectsProjectRoleActorsSetActors = defineTool({
  name: "projects:project_role_actors:set_actors",
  description:
    "Set actors for project role. Sets the actors for a project role for a project, replacing all existing actors.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
      categorisedActors: {
        type: "object",
        description: "The actors to add to the project role.",
      },
      body_id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
    },
    required: ["projectIdOrKey", "id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project/{projectIdOrKey}/role/{id}",
    body: {
      categorisedActors: "categorisedActors",
      id: "body_id",
    },
  },
});
