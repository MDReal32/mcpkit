import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getIssue = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}:get",
  description: "Get an issue with its fields.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      fields: {
        type: "string",
        description: "Fields to return, comma-separated (summary,status,assignee); all navigable fields when absent.",
      },
      expand: {
        type: "string",
        description: "Comma-separated expansions, such as renderedFields,changelog,transitions.",
      },
      properties: { type: "string", description: "Issue properties to return, comma-separated." },
    },
    required: ["issueIdOrKey"],
  },
  request: { method: "GET", path: "/rest/api/2/issue/{issueIdOrKey}", query: ["fields", "expand", "properties"] },
  applies: JIRA_DATA_CENTER_9,
});
