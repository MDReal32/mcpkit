import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectMeta = defineTool({
  name: "projects:projects:get_project_meta",
  description:
    '[Deprecated] [Deprecated] Get project metadata. Deprecated in favor of Get folder metadata. Get metadata for a project (now called a "folder").',
  input: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID of the project to get metadata for.",
      },
    },
    required: ["project_id"],
  },
  request: {
    method: "GET",
    path: "/v1/projects/{project_id}/meta",
  },
});
