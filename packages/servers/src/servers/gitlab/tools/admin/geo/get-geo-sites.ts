import { defineTool } from "@usemcpkit/core";

export const adminGeoGetGeoSites = defineTool({
  name: "admin:geo:get_geo_sites",
  description: "Retrieve a Geo site. Retrieves a specified Geo site.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the site",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/geo_sites/{id}",
  },
});
