import { defineTool } from "@usemcpkit/core";

export const projectsProjectComponentsFindComponentsForProjects = defineTool({
  name: "projects:project_components:find_components_for_projects",
  description:
    "Find components for projects. Returns a paginated list of all components in a project, including global (Compass) components when applicable.",
  input: {
    type: "object",
    properties: {
      projectIdsOrKeys: {
        type: "string",
        description: "The project IDs and/or project keys (case sensitive). (comma-separated)",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      orderBy: {
        type: "string",
        enum: ["description", "-description", "+description", "name", "-name", "+name"],
        description: "Order the results by a field:",
      },
      query: {
        type: "string",
        description:
          "Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive).",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/component",
    query: ["projectIdsOrKeys", "startAt", "maxResults", "orderBy", "query"],
  },
});
