import { issuesAlertManagementTools } from "./alert-management";
import { issuesApprovalRulesTools } from "./approval-rules";
import { issuesAwardEmojiTools } from "./award-emoji";
import { issuesBoardsTools } from "./boards";
import { issuesCodeReviewAnalyticsTools } from "./code-review-analytics";
import { issuesDiscussionsTools } from "./discussions";
import { issuesDraftNotesTools } from "./draft-notes";
import { issuesEpicsTools } from "./epics";
import { issuesErrorTrackingTools } from "./error-tracking";
import { issuesExternalStatusChecksTools } from "./external-status-checks";
import { issuesIssuesTools } from "./issues";
import { issuesIterationsTools } from "./iterations";
import { issuesLabelsTools } from "./labels";
import { issuesMergeRequestApprovalsTools } from "./merge-request-approvals";
import { issuesMergeRequestsTools } from "./merge-requests";
import { issuesMergeTrainsTools } from "./merge-trains";
import { issuesMetricImagesTools } from "./metric-images";
import { issuesMilestonesTools } from "./milestones";
import { issuesNotesTools } from "./notes";
import { issuesProjectApprovalsTools } from "./project-approvals";
import { issuesResourceEventsTools } from "./resource-events";
import { issuesResourceSubscriptionsTools } from "./resource-subscriptions";
import { issuesSuggestionsTools } from "./suggestions";
import { issuesToDosTools } from "./to-dos";

export const issuesGroupTools = [
  ...issuesAlertManagementTools,
  ...issuesApprovalRulesTools,
  ...issuesAwardEmojiTools,
  ...issuesBoardsTools,
  ...issuesCodeReviewAnalyticsTools,
  ...issuesDiscussionsTools,
  ...issuesDraftNotesTools,
  ...issuesEpicsTools,
  ...issuesErrorTrackingTools,
  ...issuesExternalStatusChecksTools,
  ...issuesIssuesTools,
  ...issuesIterationsTools,
  ...issuesLabelsTools,
  ...issuesMergeRequestApprovalsTools,
  ...issuesMergeRequestsTools,
  ...issuesMergeTrainsTools,
  ...issuesMetricImagesTools,
  ...issuesMilestonesTools,
  ...issuesNotesTools,
  ...issuesProjectApprovalsTools,
  ...issuesResourceEventsTools,
  ...issuesResourceSubscriptionsTools,
  ...issuesSuggestionsTools,
  ...issuesToDosTools,
];
