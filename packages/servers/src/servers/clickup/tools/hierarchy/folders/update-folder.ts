import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersUpdateFolder = defineTool({
  name: "hierarchy:folders:update_folder",
  description:
    "Update Folder. Rename a Folder. Renaming a subfolder leaves it nested inside its parent Folder, and the response includes the `parent_folder` field.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
      name: {
        type: "string",
      },
    },
    required: ["folder_id", "name"],
  },
  request: {
    method: "PUT",
    path: "/v2/folder/{folder_id}",
    body: ["name"],
  },
});
