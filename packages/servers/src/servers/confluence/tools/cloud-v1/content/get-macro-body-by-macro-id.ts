import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetMacroBodyByMacroId = defineTool({
  name: "cloud_v1:content:get_macro_body_by_macro_id",
  description:
    "[Cloud v1] Get macro body by macro ID. Returns the body of a macro in storage format, for the given macro ID. This includes information like the name of the macro, the body of the macro, and any macro parameters. This method is mainly used by Cloud apps.",
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
    },
    required: ["id", "version", "macroId"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/history/{version}/macro/id/{macroId}",
  },
});
