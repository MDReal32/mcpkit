import { defineTool } from "@usemcpkit/core";

export const projectsProtectedBranchesCreateGroupsProtectedBranches = defineTool({
  name: "projects:protected_branches:create_groups_protected_branches",
  description:
    "Protect a repository branch. Protects a specified repository branch. Protect multiple branches by using a wildcard in the `name`.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      name: {
        type: "string",
        description: "Name of the branch or wildcard.",
      },
      push_access_level: {
        type: "integer",
        description:
          "Access level allowed to push. Defaults to `40` (Maintainer role). Does not support custom roles. Use `allowed_to_push` with `member_role_id` instead.",
        enum: [30, 40, 60, 0],
      },
      merge_access_level: {
        type: "integer",
        description:
          "Access level allowed to merge. Defaults to `40` (Maintainer role). Does not support custom roles. Use `allowed_to_merge` with `member_role_id` instead.",
        enum: [30, 40, 60, 0],
      },
      allow_force_push: {
        type: "boolean",
        description: "If `true`, members who can push to this branch can also force push.",
        default: false,
      },
      unprotect_access_level: {
        type: "integer",
        description:
          "Access level allowed to unprotect. Defaults to `40` (Maintainer role). Does not support custom roles. Use `allowed_to_unprotect` with `member_role_id` instead.",
        enum: [30, 40, 60],
      },
      allowed_to_push: {
        type: "array",
        description: "Array of users, groups, deploy keys, or access levels allowed to push to protected branches",
        items: {
          type: "object",
        },
      },
      allowed_to_merge: {
        type: "array",
        description: "Array of users, groups, or access levels allowed to merge protected branches",
        items: {
          type: "object",
        },
      },
      allowed_to_unprotect: {
        type: "array",
        description: "Array of users, groups, or access levels allowed to unprotect protected branches",
        items: {
          type: "object",
        },
      },
      code_owner_approval_required: {
        type: "boolean",
        description: "Prevent pushes to this branch if it matches an item in CODEOWNERS",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/protected_branches",
    body: [
      "name",
      "push_access_level",
      "merge_access_level",
      "allow_force_push",
      "unprotect_access_level",
      "allowed_to_push",
      "allowed_to_merge",
      "allowed_to_unprotect",
      "code_owner_approval_required",
    ],
  },
});
