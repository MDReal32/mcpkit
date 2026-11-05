import { defineTool } from "@usemcpkit/core";

export const projectsFoldersGetFolder = defineTool({
  name: "projects:folders:get_folder",
  description: "Get folder details. Get folder details including sub-folder and workflow counts.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      folderId: {
        type: "string",
        description: "The ID of the folder.",
      },
    },
    required: ["projectId", "folderId"],
  },
  request: {
    method: "GET",
    path: "/projects/{projectId}/folders/{folderId}",
  },
});
