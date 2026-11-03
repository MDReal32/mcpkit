import { defineTool } from "@usemcpkit/core";

export const filesFilesGetFileVersions = defineTool({
  name: "files:files:get_file_versions",
  description:
    "Get versions of a file. This endpoint fetches the version history of a file, allowing you to see the progression of a file over time. You can then use this information to render a specific version of the file, via another endpoint.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get version history from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      page_size: {
        type: "number",
        description: "The number of items returned in a page of the response. If not included, `page_size` is `30`.",
      },
      before: {
        type: "number",
        description:
          "A version ID for one of the versions in the history. Gets versions before this ID. Used for paginating. If the response is not paginated, this link returns the same data in the current response.",
      },
      after: {
        type: "number",
        description:
          "A version ID for one of the versions in the history. Gets versions after this ID. Used for paginating. If the response is not paginated, this property is not included.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/versions",
    query: ["page_size", "before", "after"],
  },
});
