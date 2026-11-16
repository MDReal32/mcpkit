import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const addComment = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/comment:post",
  description: "Add a comment to an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      body: { type: "string", description: "The comment, plain text or wiki markup." },
      visibility: {
        type: "object",
        description: 'Who can see it: { type: "group" | "role", value: <name> }; everyone when absent.',
      },
    },
    required: ["issueIdOrKey", "body"],
  },
  request: { method: "POST", path: "/rest/api/2/issue/{issueIdOrKey}/comment", body: ["body", "visibility"] },
  applies: JIRA_DATA_CENTER_9,
});
