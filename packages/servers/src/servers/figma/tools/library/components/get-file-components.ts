import { defineTool } from "@usemcpkit/core";

export const libraryComponentsGetFileComponents = defineTool({
  name: "library:components:get_file_components",
  description: "Get file components. Get a list of published components within a file library.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to list components from. This must be a main file key, not a branch key, as it is not possible to publish from branches.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/components",
  },
});
