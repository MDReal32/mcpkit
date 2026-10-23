import { defineTool } from "@usemcpkit/core";

export const projectsProjectTypesGetAllProjectTypes = defineTool({
  name: "projects:project_types:get_all_project_types",
  description:
    "Get all project types. Returns all project types, whether or not the instance has a valid license for each type.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/type",
  },
});
