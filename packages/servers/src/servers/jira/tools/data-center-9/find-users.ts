import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const findUsers = defineTool({
  name: "rest/api/2/user/search:get",
  description: "Find users by user name, name or email.",
  input: {
    type: "object",
    properties: {
      username: { type: "string", description: "Text the user name, display name or email starts with." },
      startAt: { type: "integer", description: "Index of the first result, from 0." },
      maxResults: { type: "integer", description: "Most results to return." },
      includeActive: { type: "boolean", description: "Whether active users are found; true when absent." },
      includeInactive: { type: "boolean", description: "Whether inactive users are found." },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/search",
    query: ["username", "startAt", "maxResults", "includeActive", "includeInactive"],
  },
  applies: JIRA_DATA_CENTER_9,
});
