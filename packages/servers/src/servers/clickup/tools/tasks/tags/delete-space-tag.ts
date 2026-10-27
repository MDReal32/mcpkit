import { defineTool } from "@usemcpkit/core";

export const tasksTagsDeleteSpaceTag = defineTool({
  name: "tasks:tags:delete_space_tag",
  description: "Delete Space Tag. Delete a task Tag from a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      tag_name: {
        type: "string",
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
    required: ["space_id", "tag_name", "tag"],
  },
  request: {
    method: "DELETE",
    path: "/v2/space/{space_id}/tag/{tag_name}",
    body: ["tag"],
  },
});
