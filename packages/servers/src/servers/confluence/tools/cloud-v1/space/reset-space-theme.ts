import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceResetSpaceTheme = defineTool({
  name: "cloud_v1:space:reset_space_theme",
  description:
    "[Cloud v1] Reset space theme. Resets the space theme. This means that the space will inherit the global look and feel settings",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to reset the theme for.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/space/{spaceKey}/theme",
  },
});
