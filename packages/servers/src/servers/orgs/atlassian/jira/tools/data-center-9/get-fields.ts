import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getFields = defineTool({
  name: "rest/api/2/field:get",
  description: "List every field, system and custom, with its id (customfield_<id>) and schema.",
  input: { type: "object", properties: {} },
  request: { method: "GET", path: "/rest/api/2/field" },
  applies: JIRA_DATA_CENTER_9,
});
