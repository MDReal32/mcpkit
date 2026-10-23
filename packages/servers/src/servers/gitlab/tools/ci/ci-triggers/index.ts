import { ciCiTriggersCreateProjectsRefTriggerPipeline } from './create-projects-ref-trigger-pipeline';
import { ciCiTriggersCreateProjectsTriggerPipeline } from './create-projects-trigger-pipeline';
import { ciCiTriggersCreateProjectsTriggers } from './create-projects-triggers';
import { ciCiTriggersDeleteProjectsTriggers } from './delete-projects-triggers';
import { ciCiTriggersGetProjectsTriggers } from './get-projects-triggers';
import { ciCiTriggersListProjectsTriggers } from './list-projects-triggers';
import { ciCiTriggersUpdateProjectsTriggers } from './update-projects-triggers';

export const ciCiTriggersTools = [
  ciCiTriggersCreateProjectsRefTriggerPipeline,
  ciCiTriggersCreateProjectsTriggerPipeline,
  ciCiTriggersCreateProjectsTriggers,
  ciCiTriggersDeleteProjectsTriggers,
  ciCiTriggersGetProjectsTriggers,
  ciCiTriggersListProjectsTriggers,
  ciCiTriggersUpdateProjectsTriggers,
];
