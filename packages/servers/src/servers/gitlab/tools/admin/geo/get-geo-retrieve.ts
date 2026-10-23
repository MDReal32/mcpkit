import { defineTool } from "@usemcpkit/core";

export const adminGeoGetGeoRetrieve = defineTool({
  name: "admin:geo:get_geo_retrieve",
  description:
    "Retrieve a replicable file. Retrieves a replicable file for a Geo secondary site. Serves the file through a CDN or sendfile.",
  input: {
    type: "object",
    properties: {
      replicable_name: {
        type: "string",
        description: "Name of the replicable type, for example `package_file`.",
      },
      replicable_id: {
        type: "integer",
        description: "ID of the replicable.",
      },
    },
    required: ["replicable_name", "replicable_id"],
  },
  request: {
    method: "GET",
    path: "/geo/retrieve/{replicable_name}/{replicable_id}",
  },
});
