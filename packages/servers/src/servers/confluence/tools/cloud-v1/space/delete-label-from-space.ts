import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceDeleteLabelFromSpace = defineTool({
  name: "cloud_v1:space:delete_label_from_space",
  description: "[Cloud v1] Remove label from a space",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to remove a labels from.",
      },
      name: {
        type: "string",
        description: "The name of the label to remove",
      },
      prefix: {
        type: "string",
        description: "The prefix of the label to remove. If not provided defaults to global.",
      },
    },
    required: ["spaceKey", "name"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/space/{spaceKey}/label",
    query: ["name", "prefix"],
  },
});
