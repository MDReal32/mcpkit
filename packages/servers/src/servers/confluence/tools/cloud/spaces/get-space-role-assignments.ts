import { defineTool } from "@usemcpkit/core";

export const cloudSpacesGetSpaceRoleAssignments = defineTool({
  name: "cloud:spaces:get_space_role_assignments",
  description: "[Cloud] Get space role assignments. Retrieves the space role assignments.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space for which to retrieve assignments.",
      },
      role_id: {
        type: "string",
        description: "Filters the returned role assignments to the provided role ID.",
      },
      role_type: {
        type: "string",
        description: "Filters the returned role assignments to the provided role type.",
      },
      principal_id: {
        type: "string",
        description:
          "Filters the returned role assignments to the provided principal id. If specified, a principal-type must also be specified. Paired with a `principal-type` of `ACCESS_CLASS`, valid values include [`anonymous-users`, `jsm-project-admins`, `authenticated-users`, `all-licensed-users`, `all-product-admins`]",
      },
      principal_type: {
        type: "string",
        description:
          "Filters the returned role assignments to the provided principal type. If specified, a principal-id must also be specified.",
        enum: ["USER", "GROUP", "ACCESS_CLASS"],
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of space roles to return. If more results exist, use the `Link` response header to retrieve a relative URL that will return the next set of results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/spaces/{id}/role-assignments",
    query: {
      "role-id": "role_id",
      "role-type": "role_type",
      "principal-id": "principal_id",
      "principal-type": "principal_type",
      cursor: "cursor",
      limit: "limit",
    },
  },
});
