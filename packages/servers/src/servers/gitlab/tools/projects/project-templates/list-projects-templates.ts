import { defineTool } from "@usemcpkit/core";

export const projectsProjectTemplatesListProjectsTemplates = defineTool({
  name: "projects:project_templates:list_projects_templates",
  description: "List all templates of a particular type. Lists all templates of a specified type for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      type: {
        type: "string",
        enum: ["dockerfiles", "gitignores", "gitlab_ci_ymls", "licenses", "issues", "merge_requests"],
        description: "Type of the template.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id", "type"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/templates/{type}",
    query: ["page", "per_page"],
  },
});
