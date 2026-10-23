import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProjectsPackagesProtectionRules = defineTool({
  name: "projects:projects:update_projects_packages_protection_rules",
  description: "Update a package protection rule. Updates a package protection rule for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      package_protection_rule_id: {
        type: "integer",
        description: "ID of the package protection rule.",
      },
      package_name_pattern: {
        type: "string",
        description:
          "Package name protected by the protection rule, for example `@my-scope/my-package-*`. Wildcard character `*` is allowed.",
      },
      package_type: {
        type: "string",
        description: "Package type protected by the protection rule, for example `npm`.",
        enum: ["cargo", "conan", "generic", "helm", "maven", "npm", "nuget", "pypi", "terraform_module"],
      },
      minimum_access_level_for_delete: {
        type: "string",
        description:
          "Minimum GitLab access level required to delete a package. If the value is `null`, the default minimum access level is `maintainer`. Must be provided when `minimum_access_level_for_push` is not set. Behind a feature flag named `packages_protected_packages_delete`. Disabled by default.",
        enum: ["owner", "admin"],
      },
      minimum_access_level_for_push: {
        type: "string",
        description:
          "Minimum GitLab access level required to push a package. If the value is `null`, the default minimum access level is `developer`. Must be provided when `minimum_access_level_for_delete` is not set.",
        enum: ["maintainer", "owner", "admin"],
      },
    },
    required: ["id", "package_protection_rule_id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/packages/protection/rules/{package_protection_rule_id}",
    body: ["package_name_pattern", "package_type", "minimum_access_level_for_delete", "minimum_access_level_for_push"],
  },
});
