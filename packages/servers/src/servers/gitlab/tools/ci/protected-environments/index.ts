import { ciProtectedEnvironmentsCreateGroupsProtectedEnvironments } from "./create-groups-protected-environments";
import { ciProtectedEnvironmentsCreateProjectsProtectedEnvironments } from "./create-projects-protected-environments";
import { ciProtectedEnvironmentsDeleteGroupsProtectedEnvironments } from "./delete-groups-protected-environments";
import { ciProtectedEnvironmentsDeleteProjectsProtectedEnvironments } from "./delete-projects-protected-environments";
import { ciProtectedEnvironmentsGetGroupsProtectedEnvironments } from "./get-groups-protected-environments";
import { ciProtectedEnvironmentsGetProjectsProtectedEnvironments } from "./get-projects-protected-environments";
import { ciProtectedEnvironmentsListGroupsProtectedEnvironments } from "./list-groups-protected-environments";
import { ciProtectedEnvironmentsListProjectsProtectedEnvironments } from "./list-projects-protected-environments";
import { ciProtectedEnvironmentsUpdateGroupsProtectedEnvironments } from "./update-groups-protected-environments";
import { ciProtectedEnvironmentsUpdateProjectsProtectedEnvironments } from "./update-projects-protected-environments";

export const ciProtectedEnvironmentsTools = [
  ciProtectedEnvironmentsCreateGroupsProtectedEnvironments,
  ciProtectedEnvironmentsCreateProjectsProtectedEnvironments,
  ciProtectedEnvironmentsDeleteGroupsProtectedEnvironments,
  ciProtectedEnvironmentsDeleteProjectsProtectedEnvironments,
  ciProtectedEnvironmentsGetGroupsProtectedEnvironments,
  ciProtectedEnvironmentsGetProjectsProtectedEnvironments,
  ciProtectedEnvironmentsListGroupsProtectedEnvironments,
  ciProtectedEnvironmentsListProjectsProtectedEnvironments,
  ciProtectedEnvironmentsUpdateGroupsProtectedEnvironments,
  ciProtectedEnvironmentsUpdateProjectsProtectedEnvironments,
];
