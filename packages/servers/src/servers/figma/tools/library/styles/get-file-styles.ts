import { defineTool } from "@usemcpkit/core";

export const libraryStylesGetFileStyles = defineTool({
  name: "library:styles:get_file_styles",
  description: "Get file styles. Get a list of published styles within a file library.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to list styles from. This must be a main file key, not a branch key, as it is not possible to publish from branches.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/styles",
  },
});
