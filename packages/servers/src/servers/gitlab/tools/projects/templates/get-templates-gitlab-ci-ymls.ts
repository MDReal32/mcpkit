import { defineTool } from "@usemcpkit/core";

export const projectsTemplatesGetTemplatesGitlabCiYmls = defineTool({
  name: "projects:templates:get_templates_gitlab_ci_ymls",
  description: "Retrieve a GitLab CI/CD YAML template. Retrieves a specified GitLab CI/CD YAML template.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the GitLab CI/CD YAML template",
      },
    },
    required: ["name"],
  },
  request: {
    method: "GET",
    path: "/templates/gitlab_ci_ymls/{name}",
  },
});
