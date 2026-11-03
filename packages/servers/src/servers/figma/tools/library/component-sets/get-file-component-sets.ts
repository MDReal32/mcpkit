import { defineTool } from "@usemcpkit/core";

export const libraryComponentSetsGetFileComponentSets = defineTool({
  name: "library:component_sets:get_file_component_sets",
  description: "Get file component sets. Get a list of published component sets within a file library.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to list component sets from. This must be a main file key, not a branch key, as it is not possible to publish from branches.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/component_sets",
  },
});
