import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceGetSpaceContentStates = defineTool({
  name: "cloud_v1:space:get_space_content_states",
  description: "[Cloud v1] Get space suggested content states. Get content states that are suggested in the space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to be queried for its content state settings.",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/space/{spaceKey}/state",
  },
});
