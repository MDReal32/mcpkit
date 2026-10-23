import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsGetGlobalTheme = defineTool({
  name: "cloud_v1:settings:get_global_theme",
  description: "[Cloud v1] Get global theme. Returns the globally assigned theme.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/settings/theme/selected",
  },
});
