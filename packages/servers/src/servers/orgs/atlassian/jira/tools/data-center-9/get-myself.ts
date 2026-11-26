import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getMyself = defineTool({
  name: "rest/api/2/myself:get",
  description: "Get the signed-in user.",
  input: { type: "object", properties: {} },
  request: { method: "GET", path: "/rest/api/2/myself" },
  applies: JIRA_DATA_CENTER_9,
});
