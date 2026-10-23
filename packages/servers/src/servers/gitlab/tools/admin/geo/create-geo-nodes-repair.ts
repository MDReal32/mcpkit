import { defineTool } from "@usemcpkit/core";

export const adminGeoCreateGeoNodesRepair = defineTool({
  name: "admin:geo:create_geo_nodes_repair",
  description: "Repair authentication of the Geo node. Repairs the OAuth authentication of a primary Geo node.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the node",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/geo_nodes/{id}/repair",
  },
});
