import { defineTool } from "@usemcpkit/core";

export const projectsFoldersCreateFolder = defineTool({
  name: "projects:folders:create_folder",
  description: "Create a folder. Create a folder within a project.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description:
          "The ID of the project, or `personal` to create the folder in the calling user's own personal project.",
      },
      name: {
        type: "string",
      },
      parentFolderId: {
        type: "string",
      },
    },
    required: ["projectId", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{projectId}/folders",
    body: ["name", "parentFolderId"],
  },
});
