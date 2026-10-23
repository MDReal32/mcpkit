import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceRemovePermission = defineTool({
  name: "cloud_v1:space:remove_permission",
  description:
    "[Cloud v1] Remove a space permission. Removes a space permission. Note that removing Read Space permission for a user or group will remove all the space permissions for that user or group.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to be queried for its content.",
      },
      id: {
        type: "integer",
        description: "Id of the permission to be deleted.",
      },
    },
    required: ["spaceKey", "id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/space/{spaceKey}/permission/{id}",
  },
});
