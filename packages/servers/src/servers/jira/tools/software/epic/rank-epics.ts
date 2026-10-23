import { defineTool } from "@usemcpkit/core";

export const softwareEpicRankEpics = defineTool({
  name: "software:epic:rank_epics",
  description: "Rank epics. Moves (ranks) an epic before or after a given epic.",
  input: {
    type: "object",
    properties: {
      epicIdOrKey: {
        type: "string",
        description: "The id or key of the epic to rank.",
      },
      rankAfterEpic: {
        type: "string",
      },
      rankBeforeEpic: {
        type: "string",
      },
      rankCustomFieldId: {
        type: "integer",
      },
    },
    required: ["epicIdOrKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/agile/1.0/epic/{epicIdOrKey}/rank",
    body: ["rankAfterEpic", "rankBeforeEpic", "rankCustomFieldId"],
  },
});
