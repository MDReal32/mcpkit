import { defineTool } from "@usemcpkit/core";

export const projectsFoldersGetFolderFolders = defineTool({
  name: "projects:folders:get_folder_folders",
  description: "Get subfolders in a folder. Get a list of the direct subfolders within the specified folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "string",
        description: "ID of the parent folder to list subfolders from",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folders/{folder_id}/folders",
  },
});
