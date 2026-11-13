import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getComments = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/comment:get",
  description: "List the comments of an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      startAt: { type: "integer", description: "Index of the first result, from 0." },
      maxResults: { type: "integer", description: "Most results to return." },
      orderBy: { type: "string", description: "created or -created." },
      expand: { type: "string", description: "renderedBody for the comments as HTML." },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/comment",
    query: ["startAt", "maxResults", "orderBy", "expand"],
  },
  applies: JIRA_DATA_CENTER_9,
});
