import { projectsClassificationLevelsTools } from "./classification-levels";
import { projectsProjectAvatarsTools } from "./project-avatars";
import { projectsProjectCategoriesTools } from "./project-categories";
import { projectsProjectClassificationLevelsTools } from "./project-classification-levels";
import { projectsProjectComponentsTools } from "./project-components";
import { projectsProjectEmailTools } from "./project-email";
import { projectsProjectFeaturesTools } from "./project-features";
import { projectsProjectKeyAndNameValidationTools } from "./project-key-and-name-validation";
import { projectsProjectPermissionSchemesTools } from "./project-permission-schemes";
import { projectsProjectPropertiesTools } from "./project-properties";
import { projectsProjectRoleActorsTools } from "./project-role-actors";
import { projectsProjectRolesTools } from "./project-roles";
import { projectsProjectTemplatesTools } from "./project-templates";
import { projectsProjectTypesTools } from "./project-types";
import { projectsProjectVersionsTools } from "./project-versions";
import { projectsProjectsTools } from "./projects";

export const projectsGroupTools = [
  ...projectsClassificationLevelsTools,
  ...projectsProjectAvatarsTools,
  ...projectsProjectCategoriesTools,
  ...projectsProjectClassificationLevelsTools,
  ...projectsProjectComponentsTools,
  ...projectsProjectEmailTools,
  ...projectsProjectFeaturesTools,
  ...projectsProjectKeyAndNameValidationTools,
  ...projectsProjectPermissionSchemesTools,
  ...projectsProjectPropertiesTools,
  ...projectsProjectRoleActorsTools,
  ...projectsProjectRolesTools,
  ...projectsProjectTemplatesTools,
  ...projectsProjectTypesTools,
  ...projectsProjectVersionsTools,
  ...projectsProjectsTools,
];
