import { issuesExternalStatusChecksCreateProjectsExternalStatusChecks } from "./create-projects-external-status-checks";
import { issuesExternalStatusChecksCreateProjectsMergeRequestsStatusCheckResponses } from "./create-projects-merge-requests-status-check-responses";
import { issuesExternalStatusChecksCreateProjectsMergeRequestsStatusChecksRetry } from "./create-projects-merge-requests-status-checks-retry";
import { issuesExternalStatusChecksDeleteProjectsExternalStatusChecks } from "./delete-projects-external-status-checks";
import { issuesExternalStatusChecksListProjectsExternalStatusChecks } from "./list-projects-external-status-checks";
import { issuesExternalStatusChecksListProjectsMergeRequestsStatusChecks } from "./list-projects-merge-requests-status-checks";
import { issuesExternalStatusChecksUpdateProjectsExternalStatusChecks } from "./update-projects-external-status-checks";

export const issuesExternalStatusChecksTools = [
  issuesExternalStatusChecksCreateProjectsExternalStatusChecks,
  issuesExternalStatusChecksCreateProjectsMergeRequestsStatusCheckResponses,
  issuesExternalStatusChecksCreateProjectsMergeRequestsStatusChecksRetry,
  issuesExternalStatusChecksDeleteProjectsExternalStatusChecks,
  issuesExternalStatusChecksListProjectsExternalStatusChecks,
  issuesExternalStatusChecksListProjectsMergeRequestsStatusChecks,
  issuesExternalStatusChecksUpdateProjectsExternalStatusChecks,
];
