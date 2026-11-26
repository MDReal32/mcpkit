import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getServerInfo = defineTool({
  name: "rest/api/2/serverInfo:get",
  description: "Get the Jira version, build and base URL.",
  input: { type: "object", properties: {} },
  request: { method: "GET", path: "/rest/api/2/serverInfo" },
  applies: JIRA_DATA_CENTER_9,
});
