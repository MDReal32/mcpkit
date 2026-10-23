import { defineTool } from "@usemcpkit/core";

export const softwareIssueGetIssueEstimationForBoard = defineTool({
  name: "software:issue:get_issue_estimation_for_board",
  description:
    "Get issue estimation for board. Returns the estimation of the issue and a fieldId of the field that is used for it. `boardId` param is required. This param determines which field will be updated on a issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the requested issue.",
      },
      boardId: {
        type: "integer",
        description: "The ID of the board required to determine which field is used for estimation.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/issue/{issueIdOrKey}/estimation",
    query: ["boardId"],
  },
});
