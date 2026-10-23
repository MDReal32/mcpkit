import { defineTool } from "@usemcpkit/core";

export const projectsProjectMirrorsUpdateProjectsMirrorPull = defineTool({
  name: "projects:project_mirrors:update_projects_mirror_pull",
  description:
    "Update project pull mirroring settings. Updates pull mirroring settings for a specified project. This feature was introduced in GitLab 17.5.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      enabled: {
        type: "boolean",
        description:
          "If `true`, enables pull mirroring on the project. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      url: {
        type: "string",
        description:
          "URL of the remote repository being mirrored. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      auth_user: {
        type: "string",
        description:
          "Username used to authenticate a project pull mirror. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      auth_password: {
        type: "string",
        description:
          "Password used to authenticate a project pull mirror, or a personal access token with the `api` scope enabled. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      mirror_trigger_builds: {
        type: "boolean",
        description:
          "If `true`, triggers pipelines for mirror updates. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      only_mirror_protected_branches: {
        type: "boolean",
        description:
          "If `true`, limits mirroring to only protected branches. Mutually exclusive with `mirror_branch_regex`. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      mirror_overwrites_diverged_branches: {
        type: "boolean",
        description:
          "If `true`, overwrites diverged branches. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_regex` must be provided.",
      },
      mirror_branch_regex: {
        type: "string",
        description:
          "Regular expression for branch names to mirror. Only branches with names matching the regex are mirrored. Requires `only_mirror_protected_branches` to be disabled. Mutually exclusive with `only_mirror_protected_branches`. At least one of `enabled`, `url`, `auth_user`, `auth_password`, `mirror_overwrites_diverged_branches`, `mirror_trigger_builds`, `only_mirror_protected_branches`, `mirror_branch_r…",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/mirror/pull",
    body: [
      "enabled",
      "url",
      "auth_user",
      "auth_password",
      "mirror_trigger_builds",
      "only_mirror_protected_branches",
      "mirror_overwrites_diverged_branches",
      "mirror_branch_regex",
    ],
  },
});
