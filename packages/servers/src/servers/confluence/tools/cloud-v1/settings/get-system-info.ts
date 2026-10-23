import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsGetSystemInfo = defineTool({
  name: "cloud_v1:settings:get_system_info",
  description:
    "[Cloud v1] Get system info. Returns the system information for the Confluence Cloud tenant. This information is used by Atlassian.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/settings/systemInfo",
  },
});
