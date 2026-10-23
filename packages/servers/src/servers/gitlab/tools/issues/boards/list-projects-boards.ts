import { defineTool } from "@usemcpkit/core";

export const issuesBoardsListProjectsBoards = defineTool({
  name: "issues:boards:list_projects_boards",
  description: "List all project issue boards. Lists all issue boards in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/boards",
    query: ["page", "per_page"],
  },
});
