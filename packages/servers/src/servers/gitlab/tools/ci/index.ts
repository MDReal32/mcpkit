import { ciAgentsTools } from "./agents";
import { ciCiCatalogTools } from "./ci-catalog";
import { ciCiJobsTools } from "./ci-jobs";
import { ciCiLintTools } from "./ci-lint";
import { ciCiMinutesTools } from "./ci-minutes";
import { ciCiResourceGroupsTools } from "./ci-resource-groups";
import { ciCiRunnersTools } from "./ci-runners";
import { ciCiTriggersTools } from "./ci-triggers";
import { ciCiVariablesTools } from "./ci-variables";
import { ciClusterAgentsTools } from "./cluster-agents";
import { ciClustersTools } from "./clusters";
import { ciEnvironmentsTools } from "./environments";
import { ciFeatureFlagsTools } from "./feature-flags";
import { ciJobArtifactsTools } from "./job-artifacts";
import { ciJobsTools } from "./jobs";
import { ciPipelineSchedulesTools } from "./pipeline-schedules";
import { ciPipelinesTools } from "./pipelines";
import { ciProtectedEnvironmentsTools } from "./protected-environments";
import { ciRolloutsTools } from "./rollouts";
import { ciRunnerControllerTokensTools } from "./runner-controller-tokens";
import { ciRunnerControllersTools } from "./runner-controllers";
import { ciRunnersTools } from "./runners";
import { ciSecureFilesTools } from "./secure-files";
import { ciTerraformTools } from "./terraform";
import { ciUnleashTools } from "./unleash";

export const ciGroupTools = [
  ...ciAgentsTools,
  ...ciCiCatalogTools,
  ...ciCiJobsTools,
  ...ciCiLintTools,
  ...ciCiMinutesTools,
  ...ciCiResourceGroupsTools,
  ...ciCiRunnersTools,
  ...ciCiTriggersTools,
  ...ciCiVariablesTools,
  ...ciClusterAgentsTools,
  ...ciClustersTools,
  ...ciEnvironmentsTools,
  ...ciFeatureFlagsTools,
  ...ciJobArtifactsTools,
  ...ciJobsTools,
  ...ciPipelineSchedulesTools,
  ...ciPipelinesTools,
  ...ciProtectedEnvironmentsTools,
  ...ciRolloutsTools,
  ...ciRunnerControllerTokensTools,
  ...ciRunnerControllersTools,
  ...ciRunnersTools,
  ...ciSecureFilesTools,
  ...ciTerraformTools,
  ...ciUnleashTools,
];
