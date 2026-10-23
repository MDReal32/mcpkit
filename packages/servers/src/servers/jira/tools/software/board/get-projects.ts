import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetProjects = defineTool({
  name: "software:board:get_projects",
  description:
    "Get projects. Returns all projects that are associated with the board, for the given board ID. If the user does not have permission to view the board, no projects will be returned at all. Returned projects are ordered by the name.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
        description: "The ID of the board that contains returned projects.",
      },
      startAt: {
        type: "integer",
        description:
          "The starting index of the returned projects. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: "integer",
        description:
          "The maximum number of projects to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
    },
    required: ["boardId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/project",
    query: ["startAt", "maxResults"],
  },
});
