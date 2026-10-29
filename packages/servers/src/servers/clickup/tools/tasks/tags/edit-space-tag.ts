import { defineTool } from "@usemcpkit/core";

export const tasksTagsEditSpaceTag = defineTool({
  name: "tasks:tags:edit_space_tag",
  description: "Edit Space Tag. Update a task Tag.",
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
          fg_color: {
            type: "string",
          },
          bg_color: {
            type: "string",
          },
        },
        required: ["name", "fg_color", "bg_color"],
      },
    },
    required: ["space_id", "tag_name", "tag"],
  },
  request: {
    method: "PUT",
    path: "/v2/space/{space_id}/tag/{tag_name}",
    body: ["tag"],
  },
});
