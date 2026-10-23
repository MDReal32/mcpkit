import { issuesIssueAttachmentsTools } from "./issue-attachments";
import { issuesIssueCommentPropertiesTools } from "./issue-comment-properties";
import { issuesIssueCommentsTools } from "./issue-comments";
import { issuesIssueLinkTypesTools } from "./issue-link-types";
import { issuesIssueLinksTools } from "./issue-links";
import { issuesIssueNavigatorSettingsTools } from "./issue-navigator-settings";
import { issuesIssuePropertiesTools } from "./issue-properties";
import { issuesIssueRedactionTools } from "./issue-redaction";
import { issuesIssueRemoteLinksTools } from "./issue-remote-links";
import { issuesIssueSearchTools } from "./issue-search";
import { issuesIssueVotesTools } from "./issue-votes";
import { issuesIssueWatchersTools } from "./issue-watchers";
import { issuesIssueWorklogPropertiesTools } from "./issue-worklog-properties";
import { issuesIssueWorklogsTools } from "./issue-worklogs";
import { issuesIssuesTools } from "./issues";
import { issuesJiraExpressionsTools } from "./jira-expressions";
import { issuesJqlTools } from "./jql";
import { issuesJqlFunctionsAppsTools } from "./jql-functions-apps";
import { issuesLabelsTools } from "./labels";
import { issuesTasksTools } from "./tasks";
import { issuesTimeTrackingTools } from "./time-tracking";

export const issuesGroupTools = [
  ...issuesIssueAttachmentsTools,
  ...issuesIssueCommentPropertiesTools,
  ...issuesIssueCommentsTools,
  ...issuesIssueLinkTypesTools,
  ...issuesIssueLinksTools,
  ...issuesIssueNavigatorSettingsTools,
  ...issuesIssuePropertiesTools,
  ...issuesIssueRedactionTools,
  ...issuesIssueRemoteLinksTools,
  ...issuesIssueSearchTools,
  ...issuesIssueVotesTools,
  ...issuesIssueWatchersTools,
  ...issuesIssueWorklogPropertiesTools,
  ...issuesIssueWorklogsTools,
  ...issuesIssuesTools,
  ...issuesJiraExpressionsTools,
  ...issuesJqlFunctionsAppsTools,
  ...issuesJqlTools,
  ...issuesLabelsTools,
  ...issuesTasksTools,
  ...issuesTimeTrackingTools,
];
