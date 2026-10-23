import { defineTool } from "@usemcpkit/core";

export const securityDependencyManagementGetOccurrencesVulnerabilities = defineTool({
  name: "security:dependency_management:get_occurrences_vulnerabilities",
  description: "Get vulnerabilities. Returns vulnerabilities related to an occurrence.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the occurrence.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/occurrences/vulnerabilities",
    query: ["id"],
  },
});
