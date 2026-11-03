import { defineTool } from "@usemcpkit/core";

export const filesFilesGetFileMeta = defineTool({
  name: "files:files:get_file_meta",
  description: "Get file metadata",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get metadata for. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/meta",
  },
});
