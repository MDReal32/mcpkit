import { defineTool } from "@usemcpkit/core";

export const filesCommentsPostComment = defineTool({
  name: "files:comments:post_comment",
  description: "Add a comment to a file. Posts a new comment on the file.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to add comments in. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      message: {
        type: "string",
        description: "The text contents of the comment to post.",
      },
      comment_id: {
        type: "string",
        description:
          "The ID of the comment to reply to, if any. This must be a root comment. You cannot reply to other replies (a comment that has a parent_id).",
      },
      client_meta: {
        type: "object",
        description: "The position where to place the comment.",
        properties: {
          x: {
            type: "number",
            description: "X coordinate of the position.",
          },
          y: {
            type: "number",
            description: "Y coordinate of the position.",
          },
          node_id: {
            type: "string",
            description: "Unique id specifying the frame.",
          },
          node_offset: {
            type: "object",
            description: "A 2d vector.",
            properties: {
              x: {
                type: "number",
                description: "X coordinate of the vector.",
              },
              y: {
                type: "number",
                description: "Y coordinate of the vector.",
              },
            },
            required: ["x", "y"],
          },
          region_height: {
            type: "number",
            description: "The height of the comment region. Must be greater than 0.",
          },
          region_width: {
            type: "number",
            description: "The width of the comment region. Must be greater than 0.",
          },
          comment_pin_corner: {
            type: "string",
            description: "The corner of the comment region to pin to the node's corner as a string enum.",
            default: "bottom-right",
            enum: ["top-left", "top-right", "bottom-left", "bottom-right"],
          },
        },
      },
    },
    required: ["file_key", "message"],
  },
  request: {
    method: "POST",
    path: "/v1/files/{file_key}/comments",
    body: ["message", "comment_id", "client_meta"],
  },
});
