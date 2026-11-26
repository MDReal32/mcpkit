import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const getAttachment = defineTool({
  name: "rest/api/2/attachment/{id}:get",
  description: "Get the metadata of an attachment: file name, size, MIME type, author and its content URL.",
  input: {
    type: "object",
    properties: { id: { type: "string", description: "The attachment id." } },
    required: ["id"],
  },
  request: { method: "GET", path: "/rest/api/2/attachment/{id}" },
  applies: JIRA_DATA_CENTER_9,
});
