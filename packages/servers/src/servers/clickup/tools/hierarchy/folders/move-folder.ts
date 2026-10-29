import { defineTool } from "@usemcpkit/core";

export const hierarchyFoldersMoveFolder = defineTool({
  name: "hierarchy:folders:move_folder",
  description:
    "Move Folder. Move a Folder, either by nesting it inside another Folder as a subfolder or by moving it to another Space as a top-level Folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
      },
      parent_folder_id: {
        type: "string",
        description:
          "ID of the Folder to nest this Folder inside of, making it a subfolder. The destination Folder must be in the same Workspace. Subfolder support must be enabled for the Workspace.",
      },
      space_id: {
        type: "string",
        description:
          "ID of the Space to move this Folder to as a top-level Folder. Ignored when `parent_folder_id` is also provided, in which case the Folder inherits the Space of its new parent Folder.",
      },
      position: {
        type: "integer",
        description:
          "Position of the Folder among its siblings in the destination. Defaults to the top of the destination when omitted.",
      },
      custom_type_map: {
        type: "object",
        description:
          'Map of task type IDs in the Folder to the task type IDs to use after the move, as `{"<source_type_id>": <destination_type_id>}`. Required when moving to a destination where a task type used in the Folder is unavailable.',
      },
    },
    required: ["folder_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/folder/{folder_id}/position",
    body: ["parent_folder_id", "space_id", "position", "custom_type_map"],
  },
});
