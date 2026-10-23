import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreateChildAttachment = defineTool({
  name: "datacenter:content:create_child_attachment",
  description:
    "[Data Center] Create attachments. Add one or more attachments to a Confluence Content entity, with optional comments.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The id of the content the attachment is on.",
      },
      expand: {
        type: "string",
        description: "(optional) a comma separated list of properties to expand on the Attachments returned. Optional.",
      },
      allowDuplicated: {
        type: "boolean",
        description: "(optional) allows to upload an attachment with an existing filename.",
      },
      status: {
        type: "string",
        description:
          "a string containing the status of the attachments content container, supports current or draft, defaults to current",
      },
      file: {
        type: "string",
        description: 'The name of the multipart/form-data parameter that contains attachments must be \\"file\\".',
      },
      comment: {
        type: "string",
        description:
          '(optional) a list of \\"comments\\" matching the list of attachment data.\\nIf supplied, the size of this list must match the size of the fileParts list.',
      },
      minorEdit: {
        type: "boolean",
        description:
          '(optional) form parameter indicating whether the attachments should be \\"minorEdits\\".If \\"minorEdits\\" is set to true, no notification email will be generated for that attachment.',
      },
      hidden: {
        type: "boolean",
        description:
          '(optional) form parameter indicating whether the attachments should be \\"hidden\\".If \\"hidden\\" is set to true, no notification email or activity stream will be generated for that attachment.',
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/content/{id}/child/attachment",
    query: ["expand", "allowDuplicated", "status"],
    body: ["file", "comment", "minorEdit", "hidden"],
    contentType: "multipart/form-data",
  },
});
