import { defineTool } from "@usemcpkit/core";

export const securityDependabotSetRepositoryAccessDefaultLevelForEnterprise = defineTool({
  name: "security:dependabot:set_repository_access_default_level_for_enterprise",
  description:
    "Set the default repository access level for Dependabot in an enterprise. Sets the default level of repository access Dependabot will have while performing an update across organizations in the enterprise. Available values are: - 'public' - Dependabot will only have access to public repositories, unless access is explicitly granted to non-public repositories. - 'internal' - Dependabot will only have access to public and internal repositories, unless access is explicitl…",
  input: {
    type: "object",
    properties: {
      enterprise: {
        type: "string",
        description: "The slug version of the enterprise name.",
      },
      default_level: {
        type: "string",
        description: "The default repository access level for Dependabot updates.",
        enum: ["public", "internal"],
      },
    },
    required: ["enterprise", "default_level"],
  },
  request: {
    method: "PUT",
    path: "/enterprises/{enterprise}/dependabot/repository-access/default-level",
    body: ["default_level"],
  },
});
