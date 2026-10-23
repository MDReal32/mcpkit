import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjects = defineTool({
  name: "projects:projects:get_projects",
  description:
    "Retrieve a project. Retrieves details on a specified project. This endpoint can be accessed without authentication if the project is publicly accessible.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      statistics: {
        type: "boolean",
        default: false,
        description:
          "If `true`, includes project statistics. Available only to users with the Reporter, Developer, Maintainer, or Owner role.",
      },
      with_custom_attributes: {
        type: "boolean",
        default: false,
        description: "If `true`, includes custom attributes in the response. Administrators only.",
      },
      custom_attributes: {
        type: "object",
        description:
          "Filter by custom attributes that match all of the specified key and value pairs. Administrators only.",
      },
      license: {
        type: "boolean",
        default: false,
        description: "If `true`, includes the project license data in the response.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}",
    query: ["statistics", "with_custom_attributes", "custom_attributes", "license"],
  },
});
