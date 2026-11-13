import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const doTransition = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/transitions:post",
  description: "Move an issue through a transition, setting the fields its screen asks for.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      transition: { type: "object", description: "{ id } of a transition the issue offers now." },
      fields: {
        type: "object",
        description: "Field values the transition's screen takes, such as resolution ({ name }).",
      },
      update: {
        type: "object",
        description:
          'Operations per field id, such as { labels: [{ add: "x" }], comment: [{ add: { body: "text" } }] }.',
      },
    },
    required: ["issueIdOrKey", "transition"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/transitions",
    body: ["transition", "fields", "update"],
  },
  applies: JIRA_DATA_CENTER_9,
});
