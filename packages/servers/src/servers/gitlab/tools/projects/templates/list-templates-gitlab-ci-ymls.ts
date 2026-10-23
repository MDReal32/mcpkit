import { defineTool } from "@usemcpkit/core";

export const projectsTemplatesListTemplatesGitlabCiYmls = defineTool({
  name: "projects:templates:list_templates_gitlab_ci_ymls",
  description: "List all GitLab CI/CD YAML templates. Lists all GitLab CI/CD YAML templates.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/templates/gitlab_ci_ymls",
    query: ["page", "per_page"],
  },
});
