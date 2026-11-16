import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const assign = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/assignee:put",
  description: "Assign an issue to a user.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      name: { type: "string", description: "User name of the assignee; -1 for the project's automatic assignee." },
    },
    required: ["issueIdOrKey", "name"],
  },
  request: { method: "PUT", path: "/rest/api/2/issue/{issueIdOrKey}/assignee", body: ["name"] },
  applies: JIRA_DATA_CENTER_9,
});
