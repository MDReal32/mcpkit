import { projectsProjectPermissionSchemesAssignPermissionScheme } from './assign-permission-scheme';
import { projectsProjectPermissionSchemesGetAssignedPermissionScheme } from './get-assigned-permission-scheme';
import { projectsProjectPermissionSchemesGetProjectIssueSecurityScheme } from './get-project-issue-security-scheme';
import { projectsProjectPermissionSchemesGetSecurityLevelsForProject } from './get-security-levels-for-project';

export const projectsProjectPermissionSchemesTools = [
  projectsProjectPermissionSchemesAssignPermissionScheme,
  projectsProjectPermissionSchemesGetAssignedPermissionScheme,
  projectsProjectPermissionSchemesGetProjectIssueSecurityScheme,
  projectsProjectPermissionSchemesGetSecurityLevelsForProject,
];
