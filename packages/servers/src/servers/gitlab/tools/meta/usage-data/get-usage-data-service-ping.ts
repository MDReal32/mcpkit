import { defineTool } from "@usemcpkit/core";

export const metaUsageDataGetUsageDataServicePing = defineTool({
  name: "meta:usage_data:get_usage_data_service_ping",
  description:
    "Retrieve Service Ping payload. Retrieves the Service Ping payload from the application cache as JSON. If no cached payload is available, returns an empty response. Requires a personal access token with the `read_service_ping` scope. Introduced in GitLab 16.9.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/usage_data/service_ping",
  },
});
