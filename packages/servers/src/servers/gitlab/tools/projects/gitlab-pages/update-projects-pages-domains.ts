import { defineTool } from "@usemcpkit/core";

export const projectsGitlabPagesUpdateProjectsPagesDomains = defineTool({
  name: "projects:gitlab_pages:update_projects_pages_domains",
  description:
    "Update Pages domain. Updates a specified Pages domain in a project. You must have permissions to change an existing Pages domain.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      domain: {
        type: "string",
        description: "Custom domain.",
      },
      certificate: {
        type: "string",
        description: "Certificate in PEM format with intermediates following in most specific to least specific order.",
      },
      key: {
        type: "string",
        description: "Certificate key in PEM format.",
      },
      auto_ssl_enabled: {
        type: "boolean",
        description:
          "If `true`, enables automatic generation of SSL certificates issued by Let's Encrypt for custom domains.",
      },
    },
    required: ["id", "domain"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/pages/domains/{domain}",
    body: ["certificate", "key", "auto_ssl_enabled"],
  },
});
