import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentGetCustomContentContentPropertiesById = defineTool({
  name: "cloud:custom_content:get_custom_content_content_properties_by_id",
  description:
    "[Cloud] Get content property for custom content by id. Retrieves a specific Content Property by ID that is attached to a specified custom content.",
  input: {
    type: "object",
    properties: {
      custom_content_id: {
        type: "integer",
        description: "The ID of the custom content for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the content property being requested.",
      },
    },
    required: ["custom_content_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/custom-content/{custom_content_id}/properties/{property_id}",
  },
});
