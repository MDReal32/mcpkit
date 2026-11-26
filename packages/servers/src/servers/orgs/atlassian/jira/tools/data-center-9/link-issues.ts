import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const linkIssues = defineTool({
  name: "rest/api/2/issueLink:post",
  description: "Link two issues, such as PROJ-1 blocks PROJ-2.",
  input: {
    type: "object",
    properties: {
      type: { type: "object", description: "{ name } of the link type, such as Blocks or Relates." },
      inwardIssue: { type: "object", description: "{ key } of the inward issue (is blocked by)." },
      outwardIssue: { type: "object", description: "{ key } of the outward issue (blocks)." },
      comment: { type: "object", description: "{ body } of a comment added to the inward issue." },
    },
    required: ["type", "inwardIssue", "outwardIssue"],
  },
  request: { method: "POST", path: "/rest/api/2/issueLink", body: ["type", "inwardIssue", "outwardIssue", "comment"] },
  applies: JIRA_DATA_CENTER_9,
});
