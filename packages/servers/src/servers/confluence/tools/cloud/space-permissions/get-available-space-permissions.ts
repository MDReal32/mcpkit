import { defineTool } from "@usemcpkit/core";

export const cloudSpacePermissionsGetAvailableSpacePermissions = defineTool({
  name: "cloud:space_permissions:get_available_space_permissions",
  description: "[Cloud] Get available space permissions. Retrieves the available space permissions.",
  input: {
    type: "object",
    properties: {
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of space permissions to return. If more results exist, use the `Link` response header to retrieve a relative URL that will return the next set of results.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/space-permissions",
    query: ["cursor", "limit"],
  },
});
