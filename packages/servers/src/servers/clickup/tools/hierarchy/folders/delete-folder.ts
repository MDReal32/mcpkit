import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersDeleteFolder = defineTool({
  name: "hierarchy:folders:delete_folder",
  description: "Delete Folder. Delete a Folder from your Workspace.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/folder/{folder_id}",
  },
});
