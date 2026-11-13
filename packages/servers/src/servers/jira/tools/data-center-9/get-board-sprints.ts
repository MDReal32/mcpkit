import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getBoardSprints = defineTool({
  name: "rest/agile/1.0/board/{boardId}/sprint:get",
  description: "List the sprints of a Scrum board.",
  input: {
    type: "object",
    properties: {
      boardId: { type: "integer", description: "The board id." },
      startAt: { type: "integer", description: "Index of the first result, from 0." },
      maxResults: { type: "integer", description: "Most results to return." },
      state: { type: "string", description: "Comma-separated states: future, active, closed." },
    },
    required: ["boardId"],
  },
  request: { method: "GET", path: "/rest/agile/1.0/board/{boardId}/sprint", query: ["startAt", "maxResults", "state"] },
  applies: JIRA_DATA_CENTER_9,
});
