import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsGetTheme = defineTool({
  name: "cloud_v1:settings:get_theme",
  description:
    "[Cloud v1] Get theme. Returns a theme. This includes information about the theme name, description, and icon.",
  input: {
    type: "object",
    properties: {
      themeKey: {
        type: "string",
        description: "The key of the theme to be returned.",
      },
    },
    required: ["themeKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/settings/theme/{themeKey}",
  },
});
