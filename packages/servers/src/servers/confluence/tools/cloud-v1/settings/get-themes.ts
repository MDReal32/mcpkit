import { defineTool } from "@usemcpkit/core";

export const cloudV1SettingsGetThemes = defineTool({
  name: "cloud_v1:settings:get_themes",
  description: "[Cloud v1] Get themes. Returns all themes, not including the default theme.",
  input: {
    type: "object",
    properties: {
      start: {
        type: "integer",
        description: "The starting index of the returned themes.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of themes to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/settings/theme",
    query: ["start", "limit"],
  },
});
