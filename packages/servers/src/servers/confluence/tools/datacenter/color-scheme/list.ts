import { defineTool } from "@usemcpkit/core";

export const datacenterColorSchemeList = defineTool({
  name: "datacenter:color_scheme:list",
  description: "[Data Center] Get global color scheme. Get information about the current color scheme for the instance",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/color-scheme",
  },
});
