import { defineTool } from "@usemcpkit/core";

export const securityVulnerabilitiesCreateVulnerabilitiesDismiss = defineTool({
  name: "security:vulnerabilities:create_vulnerabilities_dismiss",
  description:
    "Dismiss a vulnerability. Dismisses a specified vulnerability. Returns status code `304` if the vulnerability is already dismissed. Returns status code `403` if the authenticated user does not have permission to change the vulnerability status.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the vulnerability.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/vulnerabilities/{id}/dismiss",
  },
});
