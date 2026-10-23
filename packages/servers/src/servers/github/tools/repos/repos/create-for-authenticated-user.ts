import { defineTool } from "@usemcpkit/core";

export const reposReposCreateForAuthenticatedUser = defineTool({
  name: "repos:repos:create_for_authenticated_user",
  description: "Create a repository for the authenticated user. Creates a new repository for the authenticated user.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the repository.",
      },
      description: {
        type: "string",
        description: "A short description of the repository.",
      },
      homepage: {
        type: "string",
        description: "A URL with more information about the repository.",
      },
      private: {
        type: "boolean",
        description: "Whether the repository is private.",
        default: false,
      },
      has_issues: {
        type: "boolean",
        description: "Whether issues are enabled.",
        default: true,
      },
      has_projects: {
        type: "boolean",
        description: "Whether projects are enabled.",
        default: true,
      },
      has_wiki: {
        type: "boolean",
        description: "Whether the wiki is enabled.",
        default: true,
      },
      has_discussions: {
        type: "boolean",
        description: "Whether discussions are enabled.",
        default: false,
      },
      team_id: {
        type: "integer",
        description:
          "The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.",
      },
      auto_init: {
        type: "boolean",
        description: "Whether the repository is initialized with a minimal README.",
        default: false,
      },
      gitignore_template: {
        type: "string",
        description: "The desired language or platform to apply to the .gitignore.",
      },
      license_template: {
        type: "string",
        description: "The license keyword of the open source license for this repository.",
      },
      allow_squash_merge: {
        type: "boolean",
        description: "Whether to allow squash merges for pull requests.",
        default: true,
      },
      allow_merge_commit: {
        type: "boolean",
        description: "Whether to allow merge commits for pull requests.",
        default: true,
      },
      allow_rebase_merge: {
        type: "boolean",
        description: "Whether to allow rebase merges for pull requests.",
        default: true,
      },
      allow_auto_merge: {
        type: "boolean",
        description: "Whether to allow Auto-merge to be used on pull requests.",
        default: false,
      },
      delete_branch_on_merge: {
        type: "boolean",
        description: "Whether to delete head branches when pull requests are merged",
        default: false,
      },
      squash_merge_commit_title: {
        type: "string",
        description: "Required when using `squash_merge_commit_message`.",
        enum: ["PR_TITLE", "COMMIT_OR_PR_TITLE"],
      },
      squash_merge_commit_message: {
        type: "string",
        description: "The default value for a squash merge commit message:",
        enum: ["PR_BODY", "COMMIT_MESSAGES", "BLANK"],
      },
      merge_commit_title: {
        type: "string",
        description: "Required when using `merge_commit_message`.",
        enum: ["PR_TITLE", "MERGE_MESSAGE"],
      },
      merge_commit_message: {
        type: "string",
        description: "The default value for a merge commit message.",
        enum: ["PR_BODY", "PR_TITLE", "BLANK"],
      },
      has_downloads: {
        type: "boolean",
        description: "Whether downloads are enabled.",
        default: true,
      },
      is_template: {
        type: "boolean",
        description: "Whether this repository acts as a template that can be used to generate new repositories.",
        default: false,
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/user/repos",
    body: [
      "name",
      "description",
      "homepage",
      "private",
      "has_issues",
      "has_projects",
      "has_wiki",
      "has_discussions",
      "team_id",
      "auto_init",
      "gitignore_template",
      "license_template",
      "allow_squash_merge",
      "allow_merge_commit",
      "allow_rebase_merge",
      "allow_auto_merge",
      "delete_branch_on_merge",
      "squash_merge_commit_title",
      "squash_merge_commit_message",
      "merge_commit_title",
      "merge_commit_message",
      "has_downloads",
      "is_template",
    ],
  },
});
