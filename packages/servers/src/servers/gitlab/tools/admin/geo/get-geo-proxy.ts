import { defineTool } from "@usemcpkit/core";

export const adminGeoGetGeoProxy = defineTool({
  name: "admin:geo:get_geo_proxy",
  description: "Returns a Geo proxy response. Determines if the current Geo site should proxy requests.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/geo/proxy",
  },
});
