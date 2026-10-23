import { defineTool } from "@usemcpkit/core";

export const orgsOrgsUpdate = defineTool({
  name: "orgs:orgs:update",
  description:
    "Update an organization. > [!WARNING] > **Closing down notice:** GitHub will replace and discontinue `members_allowed_repository_creation_type` in favor of more granular permissions. The new input parameters are `members_can_create_public_repositories`, `members_can_create_private_repositories` for all organizations and `members_can_create_internal_repositories` for organizations associated with an enterprise account usi…",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      billing_email: {
        type: "string",
        description: "Billing email address. This address is not publicized.",
      },
      company: {
        type: "string",
        description: "The company name.",
      },
      email: {
        type: "string",
        description: "The publicly visible email address.",
      },
      twitter_username: {
        type: "string",
        description: "The Twitter username of the company.",
      },
      location: {
        type: "string",
        description: "The location.",
      },
      name: {
        type: "string",
        description: "The shorthand name of the company.",
      },
      description: {
        type: "string",
        description: "The description of the company. The maximum size is 160 characters.",
      },
      has_organization_projects: {
        type: "boolean",
        description: "Whether an organization can use organization projects.",
      },
      has_repository_projects: {
        type: "boolean",
        description: "Whether repositories that belong to the organization can use repository projects.",
      },
      default_repository_permission: {
        type: "string",
        description: "Default permission level members have for organization repositories.",
        default: "read",
        enum: ["read", "write", "admin", "none"],
      },
      members_can_create_repositories: {
        type: "boolean",
        description:
          "Whether of non-admin organization members can create repositories. **Note:** A parameter can override this parameter. See `members_allowed_repository_creation_type` in this table for details.",
        default: true,
      },
      members_can_create_internal_repositories: {
        type: "boolean",
        description:
          'Whether organization members can create internal repositories, which are visible to all enterprise members. You can only allow members to create internal repositories if your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+. For more information, see "Restricting repository creation in your organization" in the GitHub Help docum…',
      },
      members_can_create_private_repositories: {
        type: "boolean",
        description:
          'Whether organization members can create private repositories, which are visible to organization members with permission. For more information, see "Restricting repository creation in your organization" in the GitHub Help documentation.',
      },
      members_can_create_public_repositories: {
        type: "boolean",
        description:
          'Whether organization members can create public repositories, which are visible to anyone. For more information, see "Restricting repository creation in your organization" in the GitHub Help documentation.',
      },
      members_allowed_repository_creation_type: {
        type: "string",
        description:
          "Specifies which types of repositories non-admin organization members can create. `private` is only available to repositories that are part of an organization on GitHub Enterprise Cloud. **Note:** This parameter is closing down and will be removed in the future. Its return value ignores internal repositories. Using this parameter overrides values set in `members_can_create_repositories`. See the p…",
        enum: ["all", "private", "none"],
      },
      members_can_create_pages: {
        type: "boolean",
        description:
          "Whether organization members can create GitHub Pages sites. Existing published sites will not be impacted.",
        default: true,
      },
      members_can_create_public_pages: {
        type: "boolean",
        description:
          "Whether organization members can create public GitHub Pages sites. Existing published sites will not be impacted.",
        default: true,
      },
      members_can_create_private_pages: {
        type: "boolean",
        description:
          "Whether organization members can create private GitHub Pages sites. Existing published sites will not be impacted.",
        default: true,
      },
      members_can_fork_private_repositories: {
        type: "boolean",
        description: "Whether organization members can fork private organization repositories.",
        default: false,
      },
      web_commit_signoff_required: {
        type: "boolean",
        description:
          "Whether contributors to organization repositories are required to sign off on commits they make through GitHub's web interface.",
        default: false,
      },
      blog: {
        type: "string",
      },
      advanced_security_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      dependabot_alerts_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      dependabot_security_updates_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      dependency_graph_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      secret_scanning_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      secret_scanning_push_protection_enabled_for_new_repositories: {
        type: "boolean",
        description: "**Endpoint closing down notice.** Please use code security configurations instead.",
      },
      secret_scanning_push_protection_custom_link_enabled: {
        type: "boolean",
        description:
          "Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection.",
      },
      secret_scanning_push_protection_custom_link: {
        type: "string",
        description:
          "If `secret_scanning_push_protection_custom_link_enabled` is true, the URL that will be displayed to contributors who are blocked from pushing a secret.",
      },
      deploy_keys_enabled_for_repositories: {
        type: "boolean",
        description: "Controls whether or not deploy keys may be added and used for repositories in the organization.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "PATCH",
    path: "/orgs/{org}",
    body: [
      "billing_email",
      "company",
      "email",
      "twitter_username",
      "location",
      "name",
      "description",
      "has_organization_projects",
      "has_repository_projects",
      "default_repository_permission",
      "members_can_create_repositories",
      "members_can_create_internal_repositories",
      "members_can_create_private_repositories",
      "members_can_create_public_repositories",
      "members_allowed_repository_creation_type",
      "members_can_create_pages",
      "members_can_create_public_pages",
      "members_can_create_private_pages",
      "members_can_fork_private_repositories",
      "web_commit_signoff_required",
      "blog",
      "advanced_security_enabled_for_new_repositories",
      "dependabot_alerts_enabled_for_new_repositories",
      "dependabot_security_updates_enabled_for_new_repositories",
      "dependency_graph_enabled_for_new_repositories",
      "secret_scanning_enabled_for_new_repositories",
      "secret_scanning_push_protection_enabled_for_new_repositories",
      "secret_scanning_push_protection_custom_link_enabled",
      "secret_scanning_push_protection_custom_link",
      "deploy_keys_enabled_for_repositories",
    ],
  },
});
