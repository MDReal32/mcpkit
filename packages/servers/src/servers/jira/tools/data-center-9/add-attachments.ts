import { defineTool } from "@usemcpkit/core";
import { JIRA_DATA_CENTER_9 } from "../../const";

export const addAttachments = defineTool({
  name: "rest/api/2/issue/{issueIdOrKey}/attachments:post",
  description: "Upload local files to an issue as attachments.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: { type: "string", description: "Issue id or key, such as PROJ-123." },
      file: { type: "array", items: { type: "string" }, description: "Paths of the local files to upload." },
    },
    required: ["issueIdOrKey", "file"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/attachments",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
  applies: JIRA_DATA_CENTER_9,
});
