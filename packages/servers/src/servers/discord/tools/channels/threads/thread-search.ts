import { defineTool } from "@usemcpkit/core";

export const channelsThreadsThreadSearch = defineTool({
  name: "channels:threads:thread_search",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      slop: {
        type: "integer",
      },
      min_id: {
        type: "string",
      },
      max_id: {
        type: "string",
      },
      tag: {},
      tag_setting: {
        type: "string",
      },
      archived: {
        type: "boolean",
      },
      sort_by: {
        type: "string",
      },
      sort_order: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      offset: {
        type: "integer",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/threads/search",
    query: [
      "name",
      "slop",
      "min_id",
      "max_id",
      "tag",
      "tag_setting",
      "archived",
      "sort_by",
      "sort_order",
      "limit",
      "offset",
    ],
  },
});
