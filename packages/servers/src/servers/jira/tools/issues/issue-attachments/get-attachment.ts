import { defineTool } from "@usemcpkit/core";

export const issuesIssueAttachmentsGetAttachment = defineTool({
  name: "issues:issue_attachments:get_attachment",
  description:
    "Get attachment metadata. Returns the metadata for an attachment. Note that the attachment itself is not returned.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the attachment.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/attachment/{id}",
  },
});
