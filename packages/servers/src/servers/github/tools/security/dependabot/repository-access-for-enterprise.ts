import { defineTool } from "@usemcpkit/core";

export const securityDependabotRepositoryAccessForEnterprise = defineTool({
  name: "security:dependabot:repository_access_for_enterprise",
  description:
    "Lists the repositories Dependabot can access in an enterprise. Lists repositories that enterprise admins have allowed Dependabot to access when updating dependencies across organizations in the enterprise.",
  input: {
    type: "object",
    properties: {
      enterprise: {
        type: "string",
        description: "The slug version of the enterprise name.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "The page number of results to fetch.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description: "Number of results per page.",
      },
    },
    required: ["enterprise"],
  },
  request: {
    method: "GET",
    path: "/enterprises/{enterprise}/dependabot/repository-access",
    query: ["page", "per_page"],
  },
});
