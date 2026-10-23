import { projectsProjectsArchiveProject } from "./archive-project";
import { projectsProjectsCreateProject } from "./create-project";
import { projectsProjectsDeleteProject } from "./delete-project";
import { projectsProjectsDeleteProjectAsynchronously } from "./delete-project-asynchronously";
import { projectsProjectsGetAllProjects } from "./get-all-projects";
import { projectsProjectsGetAllStatuses } from "./get-all-statuses";
import { projectsProjectsGetHierarchy } from "./get-hierarchy";
import { projectsProjectsGetNotificationSchemeForProject } from "./get-notification-scheme-for-project";
import { projectsProjectsGetProject } from "./get-project";
import { projectsProjectsGetRecent } from "./get-recent";
import { projectsProjectsRestore } from "./restore";
import { projectsProjectsSearchProjects } from "./search-projects";
import { projectsProjectsUpdateProject } from "./update-project";

export const projectsProjectsTools = [
  projectsProjectsArchiveProject,
  projectsProjectsCreateProject,
  projectsProjectsDeleteProject,
  projectsProjectsDeleteProjectAsynchronously,
  projectsProjectsGetAllProjects,
  projectsProjectsGetAllStatuses,
  projectsProjectsGetHierarchy,
  projectsProjectsGetNotificationSchemeForProject,
  projectsProjectsGetProject,
  projectsProjectsGetRecent,
  projectsProjectsRestore,
  projectsProjectsSearchProjects,
  projectsProjectsUpdateProject,
];
