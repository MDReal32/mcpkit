import { defineTool } from "@usemcpkit/core";

export const projectsProjectTemplatesGetProjectsTemplates = defineTool({
  name: "projects:project_templates:get_projects_templates",
  description: "Retrieve a template of a particular type. Retrieves a template of a specified type for a project.",
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
      name: {
        type: "string",
        description: "Key of the template, as obtained from the collection endpoint.",
      },
      source_template_project_id: {
        type: "integer",
        description:
          "ID of the project where the template is stored. Useful when multiple templates from different projects have the same name. If omitted, the match from the closest ancestor is returned.",
      },
      project: {
        type: "string",
        description: "Project name to use when expanding placeholders in the template. Affects only licenses.",
      },
      fullname: {
        type: "string",
        description:
          "Full name of the copyright holder to use when expanding placeholders in the template. Affects only licenses.",
      },
    },
    required: ["id", "type", "name"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/templates/{type}/{name}",
    query: ["source_template_project_id", "project", "fullname"],
  },
});
