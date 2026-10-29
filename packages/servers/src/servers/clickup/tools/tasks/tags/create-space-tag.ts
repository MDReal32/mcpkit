import { defineTool } from "@usemcpkit/core";

export const tasksTagsCreateSpaceTag = defineTool({
  name: "tasks:tags:create_space_tag",
  description: "Create Space Tag. Add a new task Tag to a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      tag: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          tag_fg: {
            type: "string",
          },
          tag_bg: {
            type: "string",
          },
        },
        required: ["name", "tag_fg", "tag_bg"],
      },
    },
    required: ["space_id", "tag"],
  },
  request: {
    method: "POST",
    path: "/v2/space/{space_id}/tag",
    body: ["tag"],
  },
});
