import { defineTool } from "@usemcpkit/core";

export const issuesBoardsListGroupsBoards = defineTool({
  name: "issues:boards:list_groups_boards",
  description: "List all group issue boards in a group. Lists all group issue boards for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    path: "/groups/{id}/boards",
    query: ["page", "per_page"],
  },
});
