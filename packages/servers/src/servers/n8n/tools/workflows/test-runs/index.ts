import { workflowsTestRunsCancelTestRun } from "./cancel-test-run";
import { workflowsTestRunsCreateTestRun } from "./create-test-run";
import { workflowsTestRunsGetTestCases } from "./get-test-cases";
import { workflowsTestRunsGetTestRun } from "./get-test-run";
import { workflowsTestRunsGetTestRuns } from "./get-test-runs";

export const workflowsTestRunsTools = [
  workflowsTestRunsCancelTestRun,
  workflowsTestRunsCreateTestRun,
  workflowsTestRunsGetTestCases,
  workflowsTestRunsGetTestRun,
  workflowsTestRunsGetTestRuns,
];
