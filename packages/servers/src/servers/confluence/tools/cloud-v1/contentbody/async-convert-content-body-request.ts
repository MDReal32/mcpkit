import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentbodyAsyncConvertContentBodyRequest = defineTool({
  name: "cloud_v1:contentbody:async_convert_content_body_request",
  description:
    "[Cloud v1] Asynchronously convert content body. Converts a content body from one format to another format asynchronously. Returns the asyncId for the asynchronous task.",
  input: {
    type: "object",
    properties: {
      to: {
        type: "string",
        enum: ["export_view"],
        description: "The name of the target format for the content body.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content to expand and populate. Expands are dependent on the `to` conversion format and may be irrelevant for certain conversions (e.g. `macroRenderedOutput` is redundant when converting to `view` format). (comma-separated)",
      },
      spaceKeyContext: {
        type: "string",
        description:
          'The space key used for resolving embedded content (page includes, files, and links) in the content body. For example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>` and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted to a link to the "Example page" page in the "TEST" space.',
      },
      contentIdContext: {
        type: "string",
        description:
          'The content ID used to find the space for resolving embedded content (page includes, files, and links) in the content body. For example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>` and the `contentIdContext=123` parameter is provided, then the link will be converted to a link to the "Example page" page in the same space that has the cont…',
      },
      allowCache: {
        type: "boolean",
        description: "Controls whether conversion results are cached and reused for identical requests.",
      },
      embeddedContentRender: {
        type: "string",
        enum: ["current", "version-at-save"],
        description: "Mode used for rendering embedded content, like attachments.",
      },
      value: {
        type: "string",
        description: "The body of the content in the relevant format.",
      },
      representation: {
        type: "string",
        description:
          "The content format type. Set the value of this property to the name of the format being used, e.g. 'storage'.",
        enum: [
          "view",
          "export_view",
          "styled_view",
          "storage",
          "editor",
          "editor2",
          "anonymous_export_view",
          "wiki",
          "atlas_doc_format",
          "plain",
          "raw",
        ],
      },
    },
    required: ["to", "value", "representation"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/contentbody/convert/async/{to}",
    query: ["expand", "spaceKeyContext", "contentIdContext", "allowCache", "embeddedContentRender"],
    body: ["value", "representation"],
  },
});
