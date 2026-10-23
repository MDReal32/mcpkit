import { ciPipelineSchedulesCreateProjectsPipelineSchedules } from './create-projects-pipeline-schedules';
import { ciPipelineSchedulesCreateProjectsPipelineSchedulesPlay } from './create-projects-pipeline-schedules-play';
import { ciPipelineSchedulesCreateProjectsPipelineSchedulesTakeOwnership } from './create-projects-pipeline-schedules-take-ownership';
import { ciPipelineSchedulesCreateProjectsPipelineSchedulesVariables } from './create-projects-pipeline-schedules-variables';
import { ciPipelineSchedulesDeleteProjectsPipelineSchedules } from './delete-projects-pipeline-schedules';
import { ciPipelineSchedulesDeleteProjectsPipelineSchedulesVariables } from './delete-projects-pipeline-schedules-variables';
import { ciPipelineSchedulesGetProjectsPipelineSchedules } from './get-projects-pipeline-schedules';
import { ciPipelineSchedulesGetProjectsPipelineSchedulesVariables } from './get-projects-pipeline-schedules-variables';
import { ciPipelineSchedulesListProjectsPipelineSchedules } from './list-projects-pipeline-schedules';
import { ciPipelineSchedulesListProjectsPipelineSchedulesPipelines } from './list-projects-pipeline-schedules-pipelines';
import { ciPipelineSchedulesUpdateProjectsPipelineSchedules } from './update-projects-pipeline-schedules';
import { ciPipelineSchedulesUpdateProjectsPipelineSchedulesVariables } from './update-projects-pipeline-schedules-variables';

export const ciPipelineSchedulesTools = [
  ciPipelineSchedulesCreateProjectsPipelineSchedules,
  ciPipelineSchedulesCreateProjectsPipelineSchedulesPlay,
  ciPipelineSchedulesCreateProjectsPipelineSchedulesTakeOwnership,
  ciPipelineSchedulesCreateProjectsPipelineSchedulesVariables,
  ciPipelineSchedulesDeleteProjectsPipelineSchedules,
  ciPipelineSchedulesDeleteProjectsPipelineSchedulesVariables,
  ciPipelineSchedulesGetProjectsPipelineSchedules,
  ciPipelineSchedulesGetProjectsPipelineSchedulesVariables,
  ciPipelineSchedulesListProjectsPipelineSchedules,
  ciPipelineSchedulesListProjectsPipelineSchedulesPipelines,
  ciPipelineSchedulesUpdateProjectsPipelineSchedules,
  ciPipelineSchedulesUpdateProjectsPipelineSchedulesVariables,
];
