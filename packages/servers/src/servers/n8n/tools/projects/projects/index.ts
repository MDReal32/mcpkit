import { projectsProjectsAddUsersToProject } from "./add-users-to-project";
import { projectsProjectsChangeUserRoleInProject } from "./change-user-role-in-project";
import { projectsProjectsCreateProject } from "./create-project";
import { projectsProjectsDeleteProject } from "./delete-project";
import { projectsProjectsDeleteUserFromProject } from "./delete-user-from-project";
import { projectsProjectsGetProjectUsers } from "./get-project-users";
import { projectsProjectsGetProjects } from "./get-projects";
import { projectsProjectsUpdateProject } from "./update-project";

export const projectsProjectsTools = [
  projectsProjectsAddUsersToProject,
  projectsProjectsChangeUserRoleInProject,
  projectsProjectsCreateProject,
  projectsProjectsDeleteProject,
  projectsProjectsDeleteUserFromProject,
  projectsProjectsGetProjectUsers,
  projectsProjectsGetProjects,
  projectsProjectsUpdateProject,
];
