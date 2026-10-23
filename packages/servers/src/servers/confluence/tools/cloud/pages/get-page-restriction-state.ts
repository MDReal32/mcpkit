import { defineTool } from "@usemcpkit/core";

export const cloudPagesGetPageRestrictionState = defineTool({
  name: "cloud:pages:get_page_restriction_state",
  description: "[Cloud] Get page restriction state. Returns the restriction state of a page.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/pages/{id}/restriction-state",
  },
});
