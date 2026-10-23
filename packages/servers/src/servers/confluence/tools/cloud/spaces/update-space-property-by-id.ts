import { defineTool } from "@usemcpkit/core";

export const cloudSpacesUpdateSpacePropertyById = defineTool({
  name: "cloud:spaces:update_space_property_by_id",
  description: "[Cloud] Update space property by id. Update a space property by its id.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "integer",
        description: "The ID of the space the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be updated.",
      },
      key: {
        type: "string",
        description: "Key of the space property",
      },
      value: {
        description: "Value of the space property.",
      },
      version: {
        type: "object",
        description: "New version number and associated message",
        properties: {
          number: {
            type: "integer",
            description: "Version number of the new version. Should be 1 more than the current version number.",
          },
          message: {
            type: "string",
            description: "Message to be associated with the new version.",
          },
        },
      },
    },
    required: ["space_id", "property_id"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/spaces/{space_id}/properties/{property_id}",
    body: ["key", "value", "version"],
  },
});
