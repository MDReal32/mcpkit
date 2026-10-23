import { ciPipelinesCreateProjectsPipeline } from "./create-projects-pipeline";
import { ciPipelinesCreateProjectsPipelinesCancel } from "./create-projects-pipelines-cancel";
import { ciPipelinesCreateProjectsPipelinesRetry } from "./create-projects-pipelines-retry";
import { ciPipelinesDeleteProjectsPipelines } from "./delete-projects-pipelines";
import { ciPipelinesGetProjectsPipelines } from "./get-projects-pipelines";
import { ciPipelinesGetProjectsPipelinesLatest } from "./get-projects-pipelines-latest";
import { ciPipelinesGetProjectsPipelinesTestReport } from "./get-projects-pipelines-test-report";
import { ciPipelinesGetProjectsPipelinesTestReportSummary } from "./get-projects-pipelines-test-report-summary";
import { ciPipelinesListPipelines } from "./list-pipelines";
import { ciPipelinesListProjectsPipelines } from "./list-projects-pipelines";
import { ciPipelinesListProjectsPipelinesBridges } from "./list-projects-pipelines-bridges";
import { ciPipelinesListProjectsPipelinesJobs } from "./list-projects-pipelines-jobs";
import { ciPipelinesListProjectsPipelinesTriggerJobs } from "./list-projects-pipelines-trigger-jobs";
import { ciPipelinesListProjectsPipelinesVariables } from "./list-projects-pipelines-variables";
import { ciPipelinesUpdateProjectsPipelinesMetadata } from "./update-projects-pipelines-metadata";

export const ciPipelinesTools = [
  ciPipelinesCreateProjectsPipeline,
  ciPipelinesCreateProjectsPipelinesCancel,
  ciPipelinesCreateProjectsPipelinesRetry,
  ciPipelinesDeleteProjectsPipelines,
  ciPipelinesGetProjectsPipelines,
  ciPipelinesGetProjectsPipelinesLatest,
  ciPipelinesGetProjectsPipelinesTestReport,
  ciPipelinesGetProjectsPipelinesTestReportSummary,
  ciPipelinesListPipelines,
  ciPipelinesListProjectsPipelines,
  ciPipelinesListProjectsPipelinesBridges,
  ciPipelinesListProjectsPipelinesJobs,
  ciPipelinesListProjectsPipelinesTriggerJobs,
  ciPipelinesListProjectsPipelinesVariables,
  ciPipelinesUpdateProjectsPipelinesMetadata,
];
