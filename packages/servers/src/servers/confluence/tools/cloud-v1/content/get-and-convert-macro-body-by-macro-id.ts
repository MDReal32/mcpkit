import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetAndConvertMacroBodyByMacroId = defineTool({
  name: "cloud_v1:content:get_and_convert_macro_body_by_macro_id",
  description:
    "[Cloud v1] Get macro body by macro ID and convert the representation synchronously. Returns the body of a macro in format specified in path, for the given macro ID. This includes information like the name of the macro, the body of the macro, and any macro parameters.",
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
          "The ID of the macro. This is usually passed by the app that the macro is in. Otherwise, find the macro ID by querying the desired content and version, then expanding the body in storage format. For example, '/content/196611/version/7?expand=content.body.storage'.",
      },
      to: {
        type: "string",
        description: "The content representation to return the macro in.",
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
    path: "/wiki/rest/api/content/{id}/history/{version}/macro/id/{macroId}/convert/{to}",
    query: ["expand", "spaceKeyContext", "embeddedContentRender"],
  },
});
