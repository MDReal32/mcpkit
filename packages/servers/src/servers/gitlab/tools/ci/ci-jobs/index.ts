import { ciCiJobsCreateProjectsJobsCancel } from './create-projects-jobs-cancel';
import { ciCiJobsCreateProjectsJobsErase } from './create-projects-jobs-erase';
import { ciCiJobsCreateProjectsJobsPlay } from './create-projects-jobs-play';
import { ciCiJobsCreateProjectsJobsRetry } from './create-projects-jobs-retry';
import { ciCiJobsGetJob } from './get-job';
import { ciCiJobsGetProjectsJobs } from './get-projects-jobs';
import { ciCiJobsGetProjectsJobsTrace } from './get-projects-jobs-trace';
import { ciCiJobsListProjectsJobs } from './list-projects-jobs';

export const ciCiJobsTools = [
  ciCiJobsCreateProjectsJobsCancel,
  ciCiJobsCreateProjectsJobsErase,
  ciCiJobsCreateProjectsJobsPlay,
  ciCiJobsCreateProjectsJobsRetry,
  ciCiJobsGetJob,
  ciCiJobsGetProjectsJobs,
  ciCiJobsGetProjectsJobsTrace,
  ciCiJobsListProjectsJobs,
];
