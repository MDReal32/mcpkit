import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentDeleteCustomContentPropertyById = defineTool({
  name: "cloud:custom_content:delete_custom_content_property_by_id",
  description:
    "[Cloud] Delete content property for custom content by id. Deletes a content property for a piece of custom content by its id.",
  input: {
    type: "object",
    properties: {
      custom_content_id: {
        type: "integer",
        description: "The ID of the custom content the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["custom_content_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/custom-content/{custom_content_id}/properties/{property_id}",
  },
});
