import { defineTool } from "@usemcpkit/core";

export const workflowsIssueResolutionsMoveResolutions = defineTool({
  name: "workflows:issue_resolutions:move_resolutions",
  description: "Move resolutions. Changes the order of issue resolutions.",
  input: {
    type: "object",
    properties: {
      after: {
        type: "string",
        description: "The ID of the resolution. Required if `position` isn't provided.",
      },
      ids: {
        type: "array",
        description: "The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID.",
        items: {
          type: "string",
        },
      },
      position: {
        type: "string",
        description: "The position for issue resolutions to be moved to. Required if `after` isn't provided.",
      },
    },
    required: ["ids"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/resolution/move",
    body: ["after", "ids", "position"],
  },
});
