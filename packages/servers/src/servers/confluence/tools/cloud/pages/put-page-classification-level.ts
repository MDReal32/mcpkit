import { defineTool } from "@usemcpkit/core";

export const cloudPagesPutPageClassificationLevel = defineTool({
  name: "cloud:pages:put_page_classification_level",
  description: "[Cloud] Update page classification level. Updates the classification level for a specific page.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the page for which classification level should be updated.",
      },
      body_id: {
        type: "string",
        description: "The ID of the classification level.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current", "draft"],
      },
    },
    required: ["id", "body_id", "status"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/pages/{id}/classification-level",
    body: {
      id: "body_id",
      status: "status",
    },
  },
});
