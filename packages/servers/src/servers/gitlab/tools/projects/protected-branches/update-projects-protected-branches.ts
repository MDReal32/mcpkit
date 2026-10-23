import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesUpdateProjectsProtectedBranches = defineTool({
  name: 'projects:protected_branches:update_projects_protected_branches',
  description: 'Update a protected branch. Updates a protected branch for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the branch or wildcard.',
      },
      allow_force_push: {
        type: 'boolean',
        description: 'If `true`, members who can push to this branch can also force push.',
      },
      allowed_to_push: {
        type: 'array',
        description: 'Array of users, groups, deploy keys, or access levels allowed to push to protected branches',
        items: {
          type: 'object',
        },
      },
      unprotect_access_level: {
        type: 'integer',
        description:
          'Access level allowed to unprotect. Defaults to `40` (Maintainer role). Does not support custom roles. Use `allowed_to_unprotect` with `member_role_id` instead.',
        enum: [30, 40, 60],
      },
      allowed_to_merge: {
        type: 'array',
        description: 'Array of users, groups, or access levels allowed to merge protected branches',
        items: {
          type: 'object',
        },
      },
      allowed_to_unprotect: {
        type: 'array',
        description: 'Array of users, groups, or access levels allowed to unprotect protected branches',
        items: {
          type: 'object',
        },
      },
      code_owner_approval_required: {
        type: 'boolean',
        description: 'Prevent pushes to this branch if it matches an item in CODEOWNERS',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/protected_branches/{name}',
    body: [
      'allow_force_push',
      'allowed_to_push',
      'unprotect_access_level',
      'allowed_to_merge',
      'allowed_to_unprotect',
      'code_owner_approval_required',
    ],
  },
});
