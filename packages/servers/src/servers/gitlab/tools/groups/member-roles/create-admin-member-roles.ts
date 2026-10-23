import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesCreateAdminMemberRoles = defineTool({
  name: 'groups:member_roles:create_admin_member_roles',
  description: 'Create Admin Role on the GitLab instance. Creates a new custom admin role with specified permissions.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name for the role. Defaults to `Admin role - custom`.',
      },
      description: {
        type: 'string',
        description: 'Description for role.',
      },
      read_admin_cicd: {
        type: 'boolean',
        description: 'Read CI/CD details for runners and jobs in the Admin Area.',
        default: false,
      },
      read_admin_groups: {
        type: 'boolean',
        description: 'Read group details in the Admin Area.',
        default: false,
      },
      read_admin_projects: {
        type: 'boolean',
        description: 'Read project details in the Admin Area.',
        default: false,
      },
      read_admin_subscription: {
        type: 'boolean',
        description: 'Read subscription details in the Admin area.',
        default: false,
      },
      read_admin_monitoring: {
        type: 'boolean',
        description:
          'Read system information such as background migrations, health checks, and Gitaly in the Admin Area.',
        default: false,
      },
      read_admin_users: {
        type: 'boolean',
        description: 'Read the user list and user details in the Admin area.',
        default: false,
      },
    },
  },
  request: {
    method: 'POST',
    path: '/admin_member_roles',
    body: [
      'name',
      'description',
      'read_admin_cicd',
      'read_admin_groups',
      'read_admin_projects',
      'read_admin_subscription',
      'read_admin_monitoring',
      'read_admin_users',
    ],
  },
});
