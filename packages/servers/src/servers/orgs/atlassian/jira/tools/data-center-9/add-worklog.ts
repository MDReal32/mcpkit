import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const addWorklog = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/worklog:post",
  description: "Log work on an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      timeSpent: { type: "string", description: "Time spent, such as 3h 20m." },
      timeSpentSeconds: { type: "integer", description: "Time spent in seconds, instead of timeSpent." },
      started: {
        type: "string",
        description: "When the work started, such as 2026-11-13T09:00:00.000+0400; now when absent.",
      },
      comment: { type: "string", description: "What was done." },
      adjustEstimate: {
        type: "string",
        description: "How the remaining estimate changes: new, leave, manual or auto (the default).",
      },
      newEstimate: { type: "string", description: "The remaining estimate with adjustEstimate new, such as 2d." },
      reduceBy: {
        type: "string",
        description: "How much to reduce the estimate by with adjustEstimate manual, such as 2d.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/worklog",
    query: ["adjustEstimate", "newEstimate", "reduceBy"],
    body: ["timeSpent", "timeSpentSeconds", "started", "comment"],
  },
  applies: JIRA_DATA_CENTER_9,
});
