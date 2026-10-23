import { defineTool } from "@usemcpkit/core";

export const ciCiRunnersGetRunnersRouterDiscovery = defineTool({
  name: "ci:ci_runners:get_runners_router_discovery",
  description:
    "Discover Job Router information. Discovers Job Router information for a runner. You must provide a valid runner authentication token.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/runners/router/discovery",
  },
});
