import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetHistoryMacroId = defineTool({
  name: "datacenter:content:get_history_macro_id",
  description:
    "[Data Center] Get macro body by macro ID. Returns the body of a macro (in storage format) with the given id. This resource is primarily used by connect applications that require the body of macro to perform their work.",
  input: {
    type: "object",
    properties: {
      macroId: {
        type: "string",
        description: "the macroId to find the correct macro.",
      },
      id: {
        type: "string",
        description: "the id of the content.",
      },
      version: {
        type: "integer",
        description: "the version of the content which the hash belongs.",
      },
    },
    required: ["macroId", "id", "version"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/history/{version}/macro/id/{macroId}",
  },
});
