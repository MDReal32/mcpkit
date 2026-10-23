import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesCreateGroupsMemberRoles = defineTool({
  name: 'groups:member_roles:create_groups_member_roles',
  description:
    'Add a member role to a group. Adds a member role to a group. You can only add member roles at the root level of the group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      base_access_level: {
        type: 'integer',
        description: 'Base access level for the custom role.',
        enum: [10, 15, 20, 25, 30, 40, 50],
      },
      name: {
        type: 'string',
        description:
          'Name of the custom role. Defaults to `<base access level> - custom`, for example `Developer - custom`.',
      },
      description: {
        type: 'string',
        description: 'Description of the custom role.',
      },
      apply_security_scan_profiles: {
        type: 'boolean',
        description: 'Apply security scan profiles.',
        default: false,
      },
      admin_merge_request: {
        type: 'boolean',
        description: 'Allows approval of merge requests.',
        default: false,
      },
      archive_project: {
        type: 'boolean',
        description: 'Allows archiving of projects.',
        default: false,
      },
      admin_ai_catalog_item_consumer: {
        type: 'boolean',
        description: 'Enable, disable, and configure custom agents and flows from the AI catalog for a project.',
        default: false,
      },
      create_security_scan_profiles: {
        type: 'boolean',
        description: 'Create security scan profiles.',
        default: false,
      },
      destroy_package: {
        type: 'boolean',
        description: 'Delete packages and package files in the package registry.',
        default: false,
      },
      remove_project: {
        type: 'boolean',
        description: 'Allows deletion of projects.',
        default: false,
      },
      delete_security_scan_profiles: {
        type: 'boolean',
        description: 'Delete security scan profiles.',
        default: false,
      },
      remove_group: {
        type: 'boolean',
        description:
          'Ability to delete or restore a subgroup. This ability does not allow deleting top-level groups. Review the retention period settings to prevent accidental deletion.',
        default: false,
      },
      manage_security_policy_link: {
        type: 'boolean',
        description: 'Allows linking security policy projects.',
        default: false,
      },
      admin_ai_catalog_item: {
        type: 'boolean',
        description: 'Create, edit, and delete custom agents and flows in the AI catalog.',
        default: false,
      },
      admin_compliance_framework: {
        type: 'boolean',
        description:
          'Create, read, update, and delete compliance frameworks. Users with this permission can also assign a compliance framework label to a project, and set the default framework of a group.',
        default: false,
      },
      admin_cicd_variables: {
        type: 'boolean',
        description: 'Create, read, update, and delete CI/CD variables.',
        default: false,
      },
      manage_deploy_tokens: {
        type: 'boolean',
        description: 'Manage deploy tokens at the group or project level.',
        default: false,
      },
      manage_group_access_tokens: {
        type: 'boolean',
        description:
          'Create, read, update, and delete group access tokens. When creating a token, users with this custom permission must select a role for that token that has the same or fewer permissions as the default role used as the base for the custom role.',
        default: false,
      },
      admin_group_member: {
        type: 'boolean',
        description:
          'Add or remove users in a group, and assign roles to users. When assigning a role, users with this custom permission must select a role that has the same or fewer permissions as the default role used as the base for their custom role.',
        default: false,
      },
      admin_integrations: {
        type: 'boolean',
        description: 'Create, read, update, and delete integrations with external applications.',
        default: false,
      },
      manage_merge_request_settings: {
        type: 'boolean',
        description:
          'Configure merge request settings at the group or project level. Group actions include managing merge checks and approval settings. Project actions include managing MR configurations, approval rules and settings, and branch targets. In order to enable Suggested reviewers, the "Manage project access tokens" custom permission needs to be enabled.',
        default: false,
      },
      manage_project_access_tokens: {
        type: 'boolean',
        description:
          'Create, read, update, and delete project access tokens. When creating a token, users with this custom permission must select a role for that token that has the same or fewer permissions as the default role used as the base for the custom role.',
        default: false,
      },
      admin_protected_branch: {
        type: 'boolean',
        description: 'Create, read, update, and delete protected branches for a project.',
        default: false,
      },
      admin_protected_environments: {
        type: 'boolean',
        description: 'Create, read, update, and delete protected environments',
        default: false,
      },
      admin_push_rules: {
        type: 'boolean',
        description: 'Configure push rules for repositories at the group or project level.',
        default: false,
      },
      admin_runners: {
        type: 'boolean',
        description: 'Create, view, edit, and delete group or project Runners. Includes configuring Runner settings.',
        default: false,
      },
      admin_security_attributes: {
        type: 'boolean',
        description:
          'Manage the security categories and attributes. Also requires the `read_security_attribute` permission.',
        default: false,
      },
      admin_terraform_state: {
        type: 'boolean',
        description: 'Execute terraform commands, lock/unlock terraform state files, and remove file versions.',
        default: false,
      },
      admin_vulnerability: {
        type: 'boolean',
        description:
          'Edit the status, linked issue, and severity of a vulnerability object. Also requires the `read_vulnerability` permission.',
        default: false,
      },
      admin_web_hook: {
        type: 'boolean',
        description: 'Manage webhooks',
        default: false,
      },
      read_agent_artifacts: {
        type: 'boolean',
        description:
          'Read GitLab Duo Agent Platform artifacts, including audit events and session metadata, that are exposed through the agent artifacts dashboard.',
        default: false,
      },
      read_compliance_dashboard: {
        type: 'boolean',
        description:
          'Read compliance capabilities including adherence, violations, and frameworks for groups and projects.',
        default: false,
      },
      read_security_scan_profiles: {
        type: 'boolean',
        description: 'Read security scan profiles.',
        default: false,
      },
      read_virtual_registry: {
        type: 'boolean',
        description:
          'Allows read access to virtual registries at the group level. Enables users to resolve packages through the virtual registry without requiring broader group membership permissions. Only works on top level groups.',
        default: false,
      },
      update_sec_ai_workflow_settings: {
        type: 'boolean',
        description:
          'Update security AI workflow settings such as SAST Vulnerability Resolution. Also requires the `read_vulnerability` permission.',
        default: false,
      },
      update_security_scan_profiles: {
        type: 'boolean',
        description: 'Update security scan profiles.',
        default: false,
      },
      read_admin_cicd: {
        type: 'boolean',
        description: 'Read CI/CD details for runners and jobs in the Admin Area.',
        default: false,
      },
      read_crm_contact: {
        type: 'boolean',
        description: 'Read CRM contact.',
        default: false,
      },
      read_dependency: {
        type: 'boolean',
        description: 'Allows read-only access to the dependencies and licenses.',
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
      read_code: {
        type: 'boolean',
        description:
          'Allows read-only access to the source code in the user interface. Does not allow users to edit or download repository archives, clone or pull repositories, view source code in an IDE, or view merge requests for private projects. You can download individual files because read-only access inherently grants the ability to make a local copy of the file.',
        default: false,
      },
      read_runners: {
        type: 'boolean',
        description: 'Allows read-only access to group or project runners, including the runner fleet dashboard.',
        default: false,
      },
      read_security_attribute: {
        type: 'boolean',
        description: 'Allows read-only access to the security categories and attributes.',
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
      read_vulnerability: {
        type: 'boolean',
        description: 'Read vulnerability reports and security dashboards.',
        default: false,
      },
    },
    required: ['id', 'base_access_level'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/member_roles',
    body: [
      'base_access_level',
      'name',
      'description',
      'apply_security_scan_profiles',
      'admin_merge_request',
      'archive_project',
      'admin_ai_catalog_item_consumer',
      'create_security_scan_profiles',
      'destroy_package',
      'remove_project',
      'delete_security_scan_profiles',
      'remove_group',
      'manage_security_policy_link',
      'admin_ai_catalog_item',
      'admin_compliance_framework',
      'admin_cicd_variables',
      'manage_deploy_tokens',
      'manage_group_access_tokens',
      'admin_group_member',
      'admin_integrations',
      'manage_merge_request_settings',
      'manage_project_access_tokens',
      'admin_protected_branch',
      'admin_protected_environments',
      'admin_push_rules',
      'admin_runners',
      'admin_security_attributes',
      'admin_terraform_state',
      'admin_vulnerability',
      'admin_web_hook',
      'read_agent_artifacts',
      'read_compliance_dashboard',
      'read_security_scan_profiles',
      'read_virtual_registry',
      'update_sec_ai_workflow_settings',
      'update_security_scan_profiles',
      'read_admin_cicd',
      'read_crm_contact',
      'read_dependency',
      'read_admin_groups',
      'read_admin_projects',
      'read_code',
      'read_runners',
      'read_security_attribute',
      'read_admin_subscription',
      'read_admin_monitoring',
      'read_admin_users',
      'read_vulnerability',
    ],
  },
});
