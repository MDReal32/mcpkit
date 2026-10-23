import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceGetSpaceSettings = defineTool({
  name: "cloud_v1:space:get_space_settings",
  description: "[Cloud v1] Get space settings. Returns the settings of a space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to be queried for its settings.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/space/{spaceKey}/settings",
  },
});
