import { defineTool } from "@usemcpkit/core";

export const projectsFoldersGetTeamFolders = defineTool({
  name: "projects:folders:get_team_folders",
  description:
    'Get top-level folders in a team. Get a list of the top-level folders (previously called "projects") within the specified team. Subfolders can be traversed with the GET /v2/folders/{folder_id}/folders endpoint. It is not possible to programmatically obtain team IDs. To obtain a team ID, navigate to the team page in the Figma file browser. The team ID is present in the URL after the word team. For example, in `https://www.figma.co…',
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "ID of the team to list folders from",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/teams/{team_id}/folders",
  },
});
