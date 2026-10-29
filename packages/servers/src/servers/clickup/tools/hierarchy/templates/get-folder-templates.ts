import { defineTool } from "@usemcpkit/core";

export const hierarchyTemplatesGetFolderTemplates = defineTool({
  name: "hierarchy:templates:get_folder_templates",
  description: "Get Folder Templates. View the Folder templates available in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/folder_template",
  },
});
