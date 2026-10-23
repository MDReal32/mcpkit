import { defineTool } from "@usemcpkit/core";

export const adminGeoGetGeoSitesStatus = defineTool({
  name: "admin:geo:get_geo_sites_status",
  description: "Retrieve a Geo site status. Retrieves the status for a specified Geo site.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the site",
      },
      refresh: {
        type: "boolean",
        description: "If `true`, fetches the latest status from the Geo site directly, ignoring the cache.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/geo_sites/{id}/status",
    query: ["refresh"],
  },
});
