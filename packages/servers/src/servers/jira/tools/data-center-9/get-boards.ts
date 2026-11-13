import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getBoards = defineTool({
  name: "rest/agile/1.0/board:get",
  description: "List the Scrum and Kanban boards the user can see.",
  input: {
    type: "object",
    properties: {
      startAt: { type: "integer", description: "Index of the first result, from 0." },
      maxResults: { type: "integer", description: "Most results to return." },
      type: { type: "string", description: "scrum or kanban." },
      name: { type: "string", description: "Text the board name contains." },
      projectKeyOrId: { type: "string", description: "Only the boards of this project." },
    },
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board",
    query: ["startAt", "maxResults", "type", "name", "projectKeyOrId"],
  },
  applies: JIRA_DATA_CENTER_9,
});
