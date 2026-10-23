import { defineTool } from "@usemcpkit/core";

export const securitySecretScanningListOrgPatternConfigs = defineTool({
  name: "security:secret_scanning:list_org_pattern_configs",
  description:
    "List organization pattern configurations. Lists the secret scanning pattern configurations for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/secret-scanning/pattern-configurations",
  },
});
