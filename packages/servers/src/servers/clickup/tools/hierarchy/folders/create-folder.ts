import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersCreateFolder = defineTool({
  name: "hierarchy:folders:create_folder",
  description:
    "Create Folder. Add a new Folder to a Space. You can optionally create the Folder as a subfolder within an existing Folder by providing `parent_folder_id` in the request body. Subfolder support must be enabled for the Workspace.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      parent_folder_id: {
        type: "string",
        description:
          "ID of an existing Folder to create this Folder inside of as a subfolder. The parent Folder must belong to the same Space specified in the path. Subfolder support must be enabled for the Workspace.",
      },
    },
    required: ["space_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/space/{space_id}/folder",
    body: ["name", "parent_folder_id"],
  },
});
