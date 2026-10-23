import { defineTool } from "@usemcpkit/core";

export const issuesBoardsCreateProjectsBoards = defineTool({
  name: "issues:boards:create_projects_boards",
  description: "Create an issue board. Creates an issue board in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "The board name",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/boards",
    body: ["name"],
  },
});
