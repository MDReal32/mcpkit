import { defineTool } from "@usemcpkit/core";

export const adminGeoCreateGeoSitesRepair = defineTool({
  name: "admin:geo:create_geo_sites_repair",
  description:
    "Repair a Geo site. Repairs the OAuth authentication of a Geo site if there is an OAuth synchronization problem between the primary or secondary Geo sites.",
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
    method: "POST",
    path: "/geo_sites/{id}/repair",
  },
});
