import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetRecent = defineTool({
  name: "projects:projects:get_recent",
  description:
    "Get recent projects. Returns a list of up to 20 projects recently viewed by the user that are still visible to the user.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:",
      },
      properties: {
        type: "string",
        description:
          "EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. Invalid property names are ignored. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/recent",
    query: ["expand", "properties"],
  },
});
