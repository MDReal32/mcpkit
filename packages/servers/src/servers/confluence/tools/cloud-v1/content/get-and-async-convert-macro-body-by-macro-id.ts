import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetAndAsyncConvertMacroBodyByMacroId = defineTool({
  name: "cloud_v1:content:get_and_async_convert_macro_body_by_macro_id",
  description:
    "[Cloud v1] Get macro body by macro ID and convert representation Asynchronously. Returns Async Id of the conversion task which will convert the macro into a content body of the desired format. The result will be available for 5 minutes after completion of the conversion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID for the content that contains the macro.",
      },
      version: {
        type: "integer",
        description:
          "The version of the content that contains the macro. Specifying `0` as the `version` will return the macro body for the latest content version.",
      },
      macroId: {
        type: "string",
        description:
          "The ID of the macro. For apps, this is passed to the macro by the Connect/Forge framework. Otherwise, find the macro ID by querying the desired content and version, then expanding the body in storage format. For example, '/content/196611/version/7?expand=content.body.storage'.",
      },
      to: {
        type: "string",
        enum: ["export_view", "view", "styled_view"],
        description:
          "The content representation to return the macro in. Currently, the following conversions are allowed:",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content to expand and populate. Expands are dependent on the `to` conversion format and may be irrelevant for certain conversions (e.g. `macroRenderedOutput` is redundant when converting to `view` format). (comma-separated)",
      },
      allowCache: {
        type: "boolean",
        description: "Controls whether conversion results are cached and reused for identical requests.",
      },
      spaceKeyContext: {
        type: "string",
        description:
          'The space key used for resolving embedded content (page includes, files, and links) in the content body. For example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>` and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted to a link to the "Example page" page in the "TEST" space.',
      },
      embeddedContentRender: {
        type: "string",
        enum: ["current", "version-at-save"],
        description: "Mode used for rendering embedded content, like attachments.",
      },
    },
    required: ["id", "version", "macroId", "to"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/history/{version}/macro/id/{macroId}/convert/async/{to}",
    query: ["expand", "allowCache", "spaceKeyContext", "embeddedContentRender"],
  },
});
