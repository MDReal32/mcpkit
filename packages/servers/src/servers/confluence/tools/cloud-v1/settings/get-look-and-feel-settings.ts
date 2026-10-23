import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsGetLookAndFeelSettings = defineTool({
  name: "cloud_v1:settings:get_look_and_feel_settings",
  description:
    "[Cloud v1] Get look and feel settings. Returns the look and feel settings for the site or a single space. This includes attributes such as the color scheme, padding, and border radius.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description:
          "The key of the space for which the look and feel settings will be returned. If this is not set, only the global look and feel settings are returned.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/settings/lookandfeel",
    query: ["spaceKey"],
  },
});
