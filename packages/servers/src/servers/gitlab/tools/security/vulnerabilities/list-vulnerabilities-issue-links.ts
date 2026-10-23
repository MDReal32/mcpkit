import { defineTool } from "@usemcpkit/core";

export const securityVulnerabilitiesListVulnerabilitiesIssueLinks = defineTool({
  name: "security:vulnerabilities:list_vulnerabilities_issue_links",
  description: "Get related issues for a vulnerability. Lists related issues for a vulnerability.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the vulnerability.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/vulnerabilities/{id}/issue_links",
  },
});
