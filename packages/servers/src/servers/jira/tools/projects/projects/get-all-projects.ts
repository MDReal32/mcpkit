import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetAllProjects = defineTool({
  name: "projects:projects:get_all_projects",
  description:
    "[Deprecated] Get all projects. Returns all projects visible to the user. Deprecated, use Get projects paginated that supports search and pagination.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:",
      },
      recent: {
        type: "integer",
        description:
          "Returns the user's most recently accessed projects. You may specify the number of results to return up to a maximum of 20. If access is anonymous, then the recently accessed projects are based on the current HTTP session.",
      },
      properties: {
        type: "string",
        description:
          "A list of project properties to return for the project. This parameter accepts a comma-separated list. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project",
    query: ["expand", "recent", "properties"],
  },
});
