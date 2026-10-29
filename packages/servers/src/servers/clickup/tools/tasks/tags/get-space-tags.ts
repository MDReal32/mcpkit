import { defineTool } from "@usemcpkit/core";

export const tasksTagsGetSpaceTags = defineTool({
  name: "tasks:tags:get_space_tags",
  description: "Get Space Tags. View the task Tags available in a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}/tag",
  },
});
