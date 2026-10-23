import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectsLanguages = defineTool({
  name: "projects:projects:get_projects_languages",
  description:
    "Retrieve programming language usage information. Retrieves information about all programming languages used in a specified project.",
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
    path: "/projects/{id}/languages",
  },
});
