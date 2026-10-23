import { defineTool } from "@usemcpkit/core";

export const projectsGitlabPagesCreateProjectsPagesDomains = defineTool({
  name: "projects:gitlab_pages:create_projects_pages_domains",
  description:
    "Create Pages domain. Creates a Pages domain in a specified project. You must have permissions to create Pages domains.",
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
        default: false,
      },
      user_provided_certificate: {
        type: "string",
        description: "All or none of `user_provided_certificate`, `user_provided_key` must be provided.",
      },
      user_provided_key: {
        type: "string",
        description: "All or none of `user_provided_certificate`, `user_provided_key` must be provided.",
      },
    },
    required: ["id", "domain"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/pages/domains",
    body: ["domain", "certificate", "key", "auto_ssl_enabled", "user_provided_certificate", "user_provided_key"],
  },
});
