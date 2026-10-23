import { defineTool } from "@usemcpkit/core";

export const cloudPagesGetPageContentPropertiesById = defineTool({
  name: "cloud:pages:get_page_content_properties_by_id",
  description:
    "[Cloud] Get content property for page by id. Retrieves a specific Content Property by ID that is attached to a specified page.",
  input: {
    type: "object",
    properties: {
      page_id: {
        type: "integer",
        description: "The ID of the page for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the content property being requested.",
      },
    },
    required: ["page_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/pages/{page_id}/properties/{property_id}",
  },
});
