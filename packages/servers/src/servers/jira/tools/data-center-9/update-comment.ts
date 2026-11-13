import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const updateComment = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/comment/{id}:put",
  description: "Change the text or visibility of a comment.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      id: { type: "string", description: "The comment id." },
      body: { type: "string", description: "The new text, plain text or wiki markup." },
      visibility: {
        type: "object",
        description: 'Who can see it: { type: "group" | "role", value: <name> }; everyone when absent.',
      },
    },
    required: ["issueIdOrKey", "id", "body"],
  },
  request: { method: "PUT", path: "/rest/api/2/issue/{issueIdOrKey}/comment/{id}", body: ["body", "visibility"] },
  applies: JIRA_DATA_CENTER_9,
});
