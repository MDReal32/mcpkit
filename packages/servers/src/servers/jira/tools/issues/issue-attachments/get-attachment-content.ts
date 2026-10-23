import { defineTool } from "@usemcpkit/core";

export const issuesIssueAttachmentsGetAttachmentContent = defineTool({
  name: "issues:issue_attachments:get_attachment_content",
  description:
    "Get attachment content. Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment to download. See the HTTP Range header standard for details.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the attachment.",
      },
      redirect: {
        type: "boolean",
        default: true,
        description:
          "Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/attachment/content/{id}",
    query: ["redirect"],
  },
});
