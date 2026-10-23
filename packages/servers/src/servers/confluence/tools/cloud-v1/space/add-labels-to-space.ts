import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceAddLabelsToSpace = defineTool({
  name: "cloud_v1:space:add_labels_to_space",
  description:
    "[Cloud v1] Add labels to a space. Adds labels to a piece of content. Does not modify the existing labels.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to add labels to.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            prefix: {
              type: "string",
              description: "The prefix for the label. `global`, `my` `team`, etc.",
            },
            name: {
              type: "string",
              description: "The name of the label, which will be shown in the UI.",
            },
          },
          required: ["name", "prefix"],
        },
      },
    },
    required: ["spaceKey", "body"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/space/{spaceKey}/label",
    bodyArg: "body",
  },
});
