import { defineTool } from "@usemcpkit/core";

export const projectsProjectMirrorsGetProjectsMirrorPull = defineTool({
  name: "projects:project_mirrors:get_projects_mirror_pull",
  description: "Retrieve project pull mirror details. Retrieves pull mirror details for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/mirror/pull",
  },
});
