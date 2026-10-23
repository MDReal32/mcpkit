import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProjectsRegistryProtectionTagRules = defineTool({
  name: "projects:projects:update_projects_registry_protection_tag_rules",
  description:
    "Update a container registry protection tag rule. Updates a container registry protection tag rule for a project. This feature was introduced in GitLab 18.9.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      protection_rule_id: {
        type: "integer",
        description: "ID of the container registry protection tag rule.",
      },
      tag_name_pattern: {
        type: "string",
        description:
          "Container tag name pattern protected by the protection rule, for example `v*-release`. Wildcard character `*` is allowed.",
      },
      minimum_access_level_for_push: {
        type: "string",
        description:
          'Minimum GitLab access level required to push container tags. To unset the value, use an empty string (`""`).',
        enum: ["maintainer", "owner", "admin", ""],
      },
      minimum_access_level_for_delete: {
        type: "string",
        description:
          'Minimum GitLab access level required to delete container tags. To unset the value, use an empty string (`""`).',
        enum: ["maintainer", "owner", "admin", ""],
      },
    },
    required: ["id", "protection_rule_id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/registry/protection/tag/rules/{protection_rule_id}",
    body: ["tag_name_pattern", "minimum_access_level_for_push", "minimum_access_level_for_delete"],
  },
});
