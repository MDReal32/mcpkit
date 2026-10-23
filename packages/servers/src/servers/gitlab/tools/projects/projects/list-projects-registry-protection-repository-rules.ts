import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsRegistryProtectionRepositoryRules = defineTool({
  name: "projects:projects:list_projects_registry_protection_repository_rules",
  description:
    "List all container repository protection rules. Lists all container repository protection rules for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/registry/protection/repository/rules",
  },
});
