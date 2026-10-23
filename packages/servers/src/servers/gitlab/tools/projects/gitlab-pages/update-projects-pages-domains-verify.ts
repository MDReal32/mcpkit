import { defineTool } from "@usemcpkit/core";

export const projectsGitlabPagesUpdateProjectsPagesDomainsVerify = defineTool({
  name: "projects:gitlab_pages:update_projects_pages_domains_verify",
  description:
    "Verify Pages domain. Verifies a specified Pages domain in a project. You must have permissions to update Pages domains.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      domain: {
        type: "string",
        description: "Custom domain to verify.",
      },
    },
    required: ["id", "domain"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/pages/domains/{domain}/verify",
  },
});
