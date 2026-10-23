import { defineTool } from "@usemcpkit/core";

export const issuesIssueAttachmentsAddAttachment = defineTool({
  name: "issues:issue_attachments:add_attachment",
  description:
    "Add attachment. Adds one or more attachments to an issue. Attachments are posted as multipart/form-data (RFC 1867).",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue that attachments are added to.",
      },
      file: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Paths of the local files to upload.",
      },
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
});
