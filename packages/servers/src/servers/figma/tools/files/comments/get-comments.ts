import { defineTool } from "@usemcpkit/core";

export const filesCommentsGetComments = defineTool({
  name: "files:comments:get_comments",
  description: "Get comments in a file. Gets a list of comments left on the file.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get comments from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      as_md: {
        type: "boolean",
        description: "If enabled, will return comments as their markdown equivalents when applicable.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/comments",
    query: ["as_md"],
  },
});
