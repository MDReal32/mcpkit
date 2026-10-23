import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUsers = defineTool({
  name: "users:users:create_users",
  description: "Create a user. Creates a user. Administrators only.",
  input: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "Email address to add to the user account.",
      },
      password: {
        type: "string",
        description:
          "The password of the new user. At least one of `password`, `reset_password`, `force_random_password` must be provided.",
      },
      reset_password: {
        type: "boolean",
        description:
          "Flag indicating the user will be sent a password reset token. At least one of `password`, `reset_password`, `force_random_password` must be provided.",
      },
      skip_confirmation: {
        type: "boolean",
        description: "Flag indicating the account is confirmed",
      },
      force_random_password: {
        type: "boolean",
        description:
          "Flag indicating a random password will be set. At least one of `password`, `reset_password`, `force_random_password` must be provided.",
      },
      name: {
        type: "string",
        description: "The name of the user",
      },
      username: {
        type: "string",
        description: "The username of the user",
      },
      linkedin: {
        type: "string",
        description: "The LinkedIn username",
      },
      twitter: {
        type: "string",
        description: "The Twitter username",
      },
      discord: {
        type: "string",
        description: "The Discord user ID",
      },
      website_url: {
        type: "string",
        description: "The website of the user",
      },
      github: {
        type: "string",
        description: "The GitHub username",
      },
      organization: {
        type: "string",
        description: "The organization of the user. Empty string or nil clears the field.",
      },
      projects_limit: {
        type: "integer",
        description: "The number of projects a user can create",
      },
      extern_uid: {
        type: "string",
        description:
          "The external authentication provider UID. All or none of `extern_uid`, `provider` must be provided.",
      },
      provider: {
        type: "string",
        description:
          "Name of the external authentication provider. All or none of `extern_uid`, `provider` must be provided.",
      },
      bio: {
        type: "string",
        description: "The biography of the user",
      },
      location: {
        type: "string",
        description: "The location of the user",
      },
      pronouns: {
        type: "string",
        description: "The pronouns of the user",
      },
      public_email: {
        type: "string",
        description: "The public email of the user",
      },
      commit_email: {
        type: "string",
        description: "The commit email, _private for private commit email",
      },
      admin: {
        type: "boolean",
        description: "Flag indicating the user is an administrator",
      },
      can_create_group: {
        type: "boolean",
        description: "Flag indicating the user can create groups",
      },
      external: {
        type: "boolean",
        description: "Flag indicating the user is an external user",
      },
      avatar: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      theme_id: {
        type: "integer",
        description: "The GitLab theme for the user",
      },
      color_scheme_id: {
        type: "integer",
        description: "The color scheme for the file viewer",
      },
      private_profile: {
        type: "boolean",
        description: "Flag indicating the user has a private profile",
      },
      note: {
        type: "string",
        description: "Admin note for this user",
      },
      view_diffs_file_by_file: {
        type: "boolean",
        description: "If `true`, the user sees only one file diff per page.",
      },
      policy_advanced_editor: {
        type: "boolean",
        description: "Flag indicating that advanced editor is enabled",
      },
      shared_runners_minutes_limit: {
        type: "integer",
        description: "Compute minutes quota for this user",
      },
      extra_shared_runners_minutes_limit: {
        type: "integer",
        description: "(admin-only) Extra compute minutes quota for this user",
      },
      group_id_for_saml: {
        type: "integer",
        description: "ID for group where SAML has been configured",
      },
      auditor: {
        type: "boolean",
        description: "Flag indicating auditor status of the user",
      },
    },
    required: ["email", "name", "username"],
  },
  request: {
    method: "POST",
    path: "/users",
    body: [
      "email",
      "password",
      "reset_password",
      "skip_confirmation",
      "force_random_password",
      "name",
      "username",
      "linkedin",
      "twitter",
      "discord",
      "website_url",
      "github",
      "organization",
      "projects_limit",
      "extern_uid",
      "provider",
      "bio",
      "location",
      "pronouns",
      "public_email",
      "commit_email",
      "admin",
      "can_create_group",
      "external",
      "avatar",
      "theme_id",
      "color_scheme_id",
      "private_profile",
      "note",
      "view_diffs_file_by_file",
      "policy_advanced_editor",
      "shared_runners_minutes_limit",
      "extra_shared_runners_minutes_limit",
      "group_id_for_saml",
      "auditor",
    ],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
