import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectFiles = defineTool({
  name: "projects:projects:get_project_files",
  description:
    '[Deprecated] [Deprecated] Get files in a project. Deprecated in favor of Get files in a folder. Get a list of all the Files within the specified project (now called a "folder").',
  input: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID of the project to list files from",
      },
      branch_data: {
        type: "boolean",
        default: false,
        description: "Returns branch metadata in the response for each main file with a branch inside the project.",
      },
    },
    required: ["project_id"],
  },
  request: {
    method: "GET",
    path: "/v1/projects/{project_id}/files",
    query: ["branch_data"],
  },
});
