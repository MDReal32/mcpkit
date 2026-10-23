import { defineTool } from "@usemcpkit/core";

export const securityVulnerabilitiesCreateProjectsVulnerabilities = defineTool({
  name: "security:vulnerabilities:create_projects_vulnerabilities",
  description: "Create a new vulnerability. Creates a new vulnerability from a confirmed finding.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      finding_id: {
        type: "integer",
        description: "ID of the vulnerability finding to create the vulnerability from.",
      },
    },
    required: ["id", "finding_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/vulnerabilities",
    body: ["finding_id"],
  },
});
