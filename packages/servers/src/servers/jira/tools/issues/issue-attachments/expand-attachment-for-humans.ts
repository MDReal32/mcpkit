import { defineTool } from "@usemcpkit/core";

export const issuesIssueAttachmentsExpandAttachmentForHumans = defineTool({
  name: "issues:issue_attachments:expand_attachment_for_humans",
  description:
    "Get all metadata for an expanded attachment. Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported.",
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
    path: "/rest/api/2/attachment/{id}/expand/human",
  },
});
