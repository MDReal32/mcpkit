import { defineTool } from "@usemcpkit/core";

export const projectsFoldersGetFolderFiles = defineTool({
  name: "projects:folders:get_folder_files",
  description: "Get files in a folder. Get a list of the files directly within the specified folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "string",
        description: "ID of the folder to list files from",
      },
      branch_data: {
        type: "boolean",
        default: false,
        description: "Returns branch metadata in the response for each main file with a branch inside the folder.",
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "GET",
    path: "/v2/folders/{folder_id}/files",
    query: ["branch_data"],
  },
});
