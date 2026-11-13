import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getTransitions = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/transitions:get",
  description: "List the transitions the user can take on an issue now, with their ids.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      transitionId: { type: "string", description: "Only this transition." },
      expand: { type: "string", description: "transitions.fields for the fields each transition's screen has." },
    },
    required: ["issueIdOrKey"],
  },
  request: { method: "GET", path: "/rest/api/2/issue/{issueIdOrKey}/transitions", query: ["transitionId", "expand"] },
  applies: JIRA_DATA_CENTER_9,
});
