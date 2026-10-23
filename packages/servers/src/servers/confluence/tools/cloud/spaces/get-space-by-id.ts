import { defineTool } from "@usemcpkit/core";

export const cloudSpacesGetSpaceById = defineTool({
  name: "cloud:spaces:get_space_by_id",
  description: "[Cloud] Get space by id. Returns a specific space.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the space to be returned.",
      },
      description_format: {
        type: "string",
        description:
          "The content format type to be returned in the `description` field of the response. If available, the representation will be available under a response field of the same name under the `description` field.",
        enum: ["plain", "view"],
      },
      include_icon: {
        type: "boolean",
        description: "If the icon for the space should be fetched or not.",
      },
      include_operations: {
        type: "boolean",
        description:
          "Includes operations associated with this space in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_properties: {
        type: "boolean",
        description:
          "Includes space properties associated with this space in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_permissions: {
        type: "boolean",
        description:
          "Includes space permissions associated with this space in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_role_assignments: {
        type: "boolean",
        description:
          "Includes role assignments associated with this space in the response. This parameter is only accepted for EAP sites. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_labels: {
        type: "boolean",
        description:
          "Includes labels associated with this space in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/spaces/{id}",
    query: {
      "description-format": "description_format",
      "include-icon": "include_icon",
      "include-operations": "include_operations",
      "include-properties": "include_properties",
      "include-permissions": "include_permissions",
      "include-role-assignments": "include_role_assignments",
      "include-labels": "include_labels",
    },
  },
});
