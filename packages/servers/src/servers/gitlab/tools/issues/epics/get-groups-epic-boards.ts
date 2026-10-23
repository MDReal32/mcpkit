import { defineTool } from "@usemcpkit/core";

export const issuesEpicsGetGroupsEpicBoards = defineTool({
  name: "issues:epics:get_groups_epic_boards",
  description:
    "Retrieve a group epic board. Retrieves a specified group epic board. This feature was introduced in GitLab 15.9.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      board_id: {
        type: "integer",
        description: "ID of the epic board.",
      },
    },
    required: ["id", "board_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epic_boards/{board_id}",
  },
});
