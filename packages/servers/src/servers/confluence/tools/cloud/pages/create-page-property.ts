import { defineTool } from "@usemcpkit/core";

export const cloudPagesCreatePageProperty = defineTool({
  name: "cloud:pages:create_page_property",
  description: "[Cloud] Create content property for page. Creates a new content property for a page.",
  input: {
    type: "object",
    properties: {
      page_id: {
        type: "integer",
        description: "The ID of the page to create a property for.",
      },
      key: {
        type: "string",
        description: "Key of the content property",
      },
      value: {
        description: "Value of the content property.",
      },
    },
    required: ["page_id"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/pages/{page_id}/properties",
    body: ["key", "value"],
  },
});
