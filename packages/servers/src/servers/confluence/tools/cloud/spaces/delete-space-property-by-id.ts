import { defineTool } from "@usemcpkit/core";

export const cloudSpacesDeleteSpacePropertyById = defineTool({
  name: "cloud:spaces:delete_space_property_by_id",
  description: "[Cloud] Delete space property by id. Deletes a space property by its id.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "integer",
        description: "The ID of the space the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["space_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/spaces/{space_id}/properties/{property_id}",
  },
});
