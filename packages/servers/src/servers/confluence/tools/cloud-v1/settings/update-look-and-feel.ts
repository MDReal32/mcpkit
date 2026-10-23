import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsUpdateLookAndFeel = defineTool({
  name: "cloud_v1:settings:update_look_and_feel",
  description:
    "[Cloud v1] Select look and feel settings. Sets the look and feel settings to the default (global) settings, the custom settings, or the current theme's settings for a space. The custom and theme settings can only be selected if there is already a theme set for a space. Note, the default space settings are inherited from the current global settings.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space for which the look and feel settings will be set.",
      },
      lookAndFeelType: {
        type: "string",
        enum: ["global", "custom", "theme"],
      },
    },
    required: ["spaceKey", "lookAndFeelType"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/settings/lookandfeel",
    body: ["spaceKey", "lookAndFeelType"],
  },
});
