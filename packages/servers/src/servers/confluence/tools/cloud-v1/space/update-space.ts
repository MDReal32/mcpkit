import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceUpdateSpace = defineTool({
  name: "cloud_v1:space:update_space",
  description: "[Cloud v1] Update space. Updates the name, description, or homepage of a space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to update.",
      },
      name: {
        type: "string",
        description: "The updated name of the space.",
      },
      description: {
        type: "object",
        description:
          "The description of the new/updated space. Note, only the 'plain' representation can be used for the description when creating or updating a space.",
        properties: {
          plain: {
            type: "object",
          },
        },
        required: ["plain"],
      },
      homepage: {
        type: "object",
        description: "The updated homepage for this space",
      },
      type: {
        type: "string",
        description: "The updated type for this space.",
      },
      status: {
        type: "string",
        description: "The updated status for this space.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/space/{spaceKey}",
    body: ["name", "description", "homepage", "type", "status"],
  },
});
