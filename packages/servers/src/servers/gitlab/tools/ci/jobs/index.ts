import { ciJobsCreateJobsArtifacts } from "./create-jobs-artifacts";
import { ciJobsCreateJobsArtifactsAuthorize } from "./create-jobs-artifacts-authorize";
import { ciJobsCreateJobsRequest } from "./create-jobs-request";
import { ciJobsGetJobsArtifacts } from "./get-jobs-artifacts";
import { ciJobsGetJobsRuntimeEnvironmentKey } from "./get-jobs-runtime-environment-key";
import { ciJobsUpdateJobs } from "./update-jobs";
import { ciJobsUpdateJobsTrace } from "./update-jobs-trace";

export const ciJobsTools = [
  ciJobsCreateJobsArtifacts,
  ciJobsCreateJobsArtifactsAuthorize,
  ciJobsCreateJobsRequest,
  ciJobsGetJobsArtifacts,
  ciJobsGetJobsRuntimeEnvironmentKey,
  ciJobsUpdateJobs,
  ciJobsUpdateJobsTrace,
];
