import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsPackagesProtectionRules = defineTool({
  name: "projects:projects:create_projects_packages_protection_rules",
  description: "Create a package protection rule. Creates a package protection rule for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
          "Minimum GitLab access level required to delete a package. If the value is `null`, the default minimum access level is `maintainer`. Must be provided when `minimum_access_level_for_push` is not set. Behind a feature flag named `packages_protected_packages_delete`. Disabled by default. At least one of `minimum_access_level_for_push`, `minimum_access_level_for_delete` must be provided.",
        enum: ["owner", "admin"],
      },
      minimum_access_level_for_push: {
        type: "string",
        description:
          "Minimum GitLab access level required to push a package. If the value is `null`, the default minimum access level is `developer`. Must be provided when `minimum_access_level_for_delete` is not set. At least one of `minimum_access_level_for_push`, `minimum_access_level_for_delete` must be provided.",
        enum: ["maintainer", "owner", "admin"],
      },
    },
    required: ["id", "package_name_pattern", "package_type"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/packages/protection/rules",
    body: ["package_name_pattern", "package_type", "minimum_access_level_for_delete", "minimum_access_level_for_push"],
  },
});
