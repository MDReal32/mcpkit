import { defineTool } from "@usemcpkit/core";

export const datacenterColorSchemeUpdateReset = defineTool({
  name: "datacenter:color_scheme:update_reset",
  description: "[Data Center] Reset global color scheme. Reset the global color scheme colors to default",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "PUT",
    path: "/rest/api/color-scheme/reset",
  },
});
