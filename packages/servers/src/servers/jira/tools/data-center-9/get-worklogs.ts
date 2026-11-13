import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getWorklogs = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/worklog:get",
  description: "List the work logged on an issue.",
  input: {
    type: "object",
    properties: { issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." } },
    required: ["issueIdOrKey"],
  },
  request: { method: "GET", path: "/rest/api/2/issue/{issueIdOrKey}/worklog" },
  applies: JIRA_DATA_CENTER_9,
});
