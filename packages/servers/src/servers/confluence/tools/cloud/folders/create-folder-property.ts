import { defineTool } from "@usemcpkit/core";

export const cloudFoldersCreateFolderProperty = defineTool({
  name: "cloud:folders:create_folder_property",
  description: "[Cloud] Create content property for folder. Creates a new content property for a folder.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the folder to create a property for.",
      },
      key: {
        type: "string",
        description: "Key of the content property",
      },
      value: {
        description: "Value of the content property.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/folders/{id}/properties",
    body: ["key", "value"],
  },
});
